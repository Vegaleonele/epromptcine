import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FILM_STYLES_CONTEXT = `
Phong cách phim và đặc điểm:
- Pixar: vibrant, whimsical, emotional, warm; soft rim light, gentle bounce; smooth storytelling shots
- Realistic: photorealistic, grounded, natural; natural/motivated light; classic cinematic movement
- Epic/Sử Thi: grand, heroic, dramatic; chiaroscuro, godrays; low-angle wide shots, slow dolly
- Sci-Fi: futuristic, cold, high-tech; neon, volumetric, lens flares; anamorphic dynamic tracking
- Fantasy: mystical, magical; volumetric fog, magical glow; floating camera, low-angle epic
- Horror: tense, oppressive, unsettling; low-key harsh shadows; Dutch angle, tight framing
- Documentary: authentic, observational; natural light minimal; static or gentle handheld
- Vintage: nostalgic, retro; warm sepia, film grain; classic film look
- Anime: expressive, stylized; dramatic cel-shading; dynamic angles, speed lines
`;

const SYSTEM_PROMPT = `Bạn là "CinePrompt Architect" - AI chuyên về Prompt Engineering cho làm phim, storyboard và text-to-video.

${FILM_STYLES_CONTEXT}

NHIỆM VỤ:
Phân tích brief của user và tạo ra các prompt chuyên nghiệp với:
1. Ngôn ngữ điện ảnh: low-angle, dutch tilt, anamorphic flare, shallow depth of field, volumetric godrays, etc.
2. Mô tả chuyển động có chủ đích: anticipation, squash & stretch, follow-through, easing
3. Thời gian ước lượng (giây) để AI video tool hiểu nhịp điệu
4. Chất lượng cao: 4K/8K, best quality, cinematic, detailed textures
5. Negative prompt mạnh

ĐỊNH DẠNG OUTPUT (JSON):
{
  "analysis": "Tóm tắt brief + phong cách + key elements (2-3 câu)",
  "startFrame": "Prompt chi tiết cho start frame",
  "endFrame": "Prompt chi tiết cho end frame", 
  "videoPrompt": "Prompt cho video với motion sequence timeline"
}

CHỈ TRẢ VỀ JSON, KHÔNG GIẢI THÍCH GÌ THÊM.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brief, style, customStyle, sceneDetails, aspectRatio, duration, fps, instructionContext } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build user message with all context
    let userMessage = `Brief: ${brief}\n\nPhong cách: ${style}`;
    
    if (style === "other" && customStyle) {
      userMessage += `\nMô tả phong cách: ${customStyle}`;
    }
    
    if (sceneDetails) {
      userMessage += `\n\nChi tiết cảnh:`;
      if (sceneDetails.subject) userMessage += `\n- Chủ thể: ${sceneDetails.subject}`;
      if (sceneDetails.action) userMessage += `\n- Hành động: ${sceneDetails.action}`;
      if (sceneDetails.environment) userMessage += `\n- Môi trường: ${sceneDetails.environment}`;
      if (sceneDetails.timeWeather) userMessage += `\n- Thời gian/thời tiết: ${sceneDetails.timeWeather}`;
      if (sceneDetails.mood) userMessage += `\n- Cảm xúc: ${sceneDetails.mood}`;
      if (sceneDetails.shotType) userMessage += `\n- Loại shot: ${sceneDetails.shotType}`;
    }
    
    userMessage += `\n\nThông số kỹ thuật:`;
    userMessage += `\n- Aspect ratio: ${aspectRatio || "16:9"}`;
    userMessage += `\n- Duration: ${duration || "5"} giây`;
    userMessage += `\n- FPS: ${fps || "24"}`;
    
    if (instructionContext) {
      userMessage += `\n\n--- INSTRUCTION CONTEXT (từ file upload) ---\n${instructionContext}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let parsedContent;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      parsedContent = JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      // Return raw content if parsing fails
      parsedContent = {
        analysis: "AI đã phân tích brief của bạn.",
        startFrame: content,
        endFrame: content,
        videoPrompt: content
      };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-prompt function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
