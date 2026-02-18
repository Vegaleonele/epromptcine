import { FILM_STYLES, type PromptInput, type GeneratedPrompts, type FilmStyle } from "@/types/prompt";

function getStyleConfig(styleId: FilmStyle) {
  return FILM_STYLES.find(s => s.id === styleId) || FILM_STYLES[0];
}

function buildStylePrefix(input: PromptInput): string {
  const style = getStyleConfig(input.style);
  
  if (input.style === "other" && input.customStyle) {
    return input.customStyle;
  }
  
  const prefixes: Record<FilmStyle, string> = {
    pixar: "Pixar-Style 3D Animation, Vibrant Whimsical Realism, Emotional Warmth++, Studio Quality Render",
    realistic: "Cinematic Hyper-Realistic, Photorealistic Textures++, Natural Lighting, Film-Quality Depth",
    epic: "Dark Cinematic Hyper-Realistic Epic Scale, Gritty Textures++, Heroic Grandeur, Dramatic Atmosphere",
    scifi: "Sci-Fi Futuristic Neon Dystopia, Holographic Effects++, High-Tech Aesthetics, Cybernetic Precision",
    fantasy: "Mystical Dark Fantasy, Ethereal Glow++, Magical Atmosphere, Enchanted Realm Aesthetics",
    horror: "Cinematic Horror Thriller, Tense Oppressive Atmosphere++, Unsettling Shadows, Psychological Dread",
    documentary: "Documentary Naturalism, Authentic Observational Style++, Subtle Grain, Intimate Realism",
    vintage: "Vintage Retro Film Aesthetic, Sepia Warm Tones++, Film Grain Texture, Nostalgic Atmosphere",
    anime: "Anime Style Animation, Expressive Cel-Shading++, Dynamic Compositions, Vibrant Saturated Colors",
    other: ""
  };
  
  return prefixes[input.style] || prefixes.realistic;
}

function buildNegativePrompt(style: FilmStyle): string {
  const common = "blurry, deformed, bad anatomy, inconsistent lighting, extra limbs, low-res, artifacts, distorted proportions, watermark, signature";
  
  const styleSpecific: Record<FilmStyle, string> = {
    pixar: `${common}, photorealistic, grimy, dark, horror elements, uncanny valley`,
    realistic: `${common}, cartoonish, anime style, oversaturated, unrealistic physics`,
    epic: `${common}, bright daylight, cheerful, comedic tone, modern elements`,
    scifi: `${common}, medieval, fantasy magic, organic chaos, low-tech`,
    fantasy: `${common}, modern technology, urban setting, mundane reality`,
    horror: `${common}, bright colors, cheerful, comedic, oversaturated`,
    documentary: `${common}, stylized, exaggerated, fantasy elements, perfect lighting`,
    vintage: `${common}, modern look, digital perfection, high saturation, clean edges`,
    anime: `${common}, photorealistic, western cartoon, 3D render unless specified`,
    other: common
  };
  
  return styleSpecific[style];
}

function parseSceneFromBrief(brief: string, input: PromptInput): string {
  const { sceneDetails } = input;
  let scene = "";
  
  if (sceneDetails.subject) {
    scene += `Subject: ${sceneDetails.subject}. `;
  }
  if (sceneDetails.action) {
    scene += `Action: ${sceneDetails.action}. `;
  }
  if (sceneDetails.environment) {
    scene += `Environment: ${sceneDetails.environment}. `;
  }
  if (sceneDetails.timeWeather) {
    scene += `Time/Weather: ${sceneDetails.timeWeather}. `;
  }
  if (sceneDetails.mood) {
    scene += `Mood: ${sceneDetails.mood}. `;
  }
  if (sceneDetails.shotType) {
    scene += `Shot: ${sceneDetails.shotType}. `;
  }
  
  return scene || brief;
}

export function generatePrompts(input: PromptInput): GeneratedPrompts {
  const styleConfig = getStyleConfig(input.style);
  const stylePrefix = buildStylePrefix(input);
  const negativePrompt = buildNegativePrompt(input.style);
  const sceneContext = parseSceneFromBrief(input.brief, input);
  
  // Analysis summary
  const analysis = `**Phong cách:** ${styleConfig.label}
**Mood/Tone:** ${styleConfig.mood || input.customStyle || "Custom defined"}
**Ánh sáng:** ${styleConfig.lighting || "As specified"}
**Camera:** ${styleConfig.camera || "Cinematic movement"}
**Brief:** ${input.brief.slice(0, 200)}${input.brief.length > 200 ? "..." : ""}`;

  // Start Frame Prompt
  const startFrame = `${stylePrefix}

${input.brief}

${sceneContext}

Start Frame Composition:
- Initial establishing pose/position
- Environment fully visible in background
- Lighting setup: ${styleConfig.lighting || "motivated natural lighting"}
- Mood established: ${styleConfig.mood || "as described"}

Technical Specifications:
- Aspect Ratio: ${input.aspectRatio}
- Shot Type: ${input.sceneDetails.shotType || "Wide establishing shot"}
- Composition: Rule of thirds, leading lines to subject
- Depth of Field: Shallow bokeh for separation

Quality: Ultra-detailed ${input.aspectRatio === "16:9" ? "4K" : "8K"} resolution, ${styleConfig.texture || "highly detailed textures"}, masterpiece quality, best quality, cinematic lighting, professional color grading

AVOID: ${negativePrompt}`;

  // End Frame Prompt
  const endFrame = `${stylePrefix}

${input.brief}

${sceneContext}

End Frame Composition:
- Final action/resolution pose
- Environment reacted to action (if applicable)
- Consistent lighting direction from start frame
- Peak emotional/dramatic moment captured

Continuity Requirements:
- Same character design, costume, proportions
- Same environment, lighting direction
- Same color palette and mood
- Same camera angle/lens characteristics

Technical Specifications:
- Aspect Ratio: ${input.aspectRatio}
- Shot Type: ${input.sceneDetails.shotType || "Dynamic dramatic angle"}
- Composition: Maintains visual consistency with start frame

Quality: Ultra-detailed ${input.aspectRatio === "16:9" ? "4K" : "8K"} resolution, ${styleConfig.texture || "highly detailed textures"}, masterpiece quality, best quality, cinematic lighting, professional color grading

AVOID: ${negativePrompt}`;

  // Video Prompt
  const duration = parseInt(input.duration) || 5;
  const fps = input.fps || "24";
  
  const videoPrompt = `${stylePrefix}

Scene Description:
${input.brief}

${sceneContext}

Motion Sequence:

ANTICIPATION:
- Subject in initial position, establishing shot
- Subtle anticipation movement (weight shift, breath, eye movement)
- Camera: Slow dolly in or static establishing

MAIN ACTION:
- Primary action/movement executed
- Dynamic camera movement following action
- Physics: cloth, hair, particles react naturally
- Peak energy moment

FOLLOW-THROUGH:
- Action consequences play out
- Environment reaction (debris, particles, effects)
- Camera settles or continues smooth movement
- Momentum carries through

RESOLUTION:
- Subject settles into final pose
- Environment stabilizes
- Camera reaches final composition
- Emotional/dramatic hold

Camera Movement:
- Primary: Smooth cinematic movement only (dolly, pan, tilt, crane)
- Lens: ${input.aspectRatio === "2.39:1" ? "Anamorphic 35mm" : "Spherical 50mm"}, shallow depth of field
- NO handheld shake (unless documentary style)

Lighting & Atmosphere:
${styleConfig.lighting || "Natural motivated lighting, consistent direction throughout"}
- Volumetric effects where appropriate
- Color palette consistent with ${styleConfig.id} style

Physics & Dynamics:
- Cloth simulation: Natural weight and flow
- Hair/fur dynamics: React to movement and wind
- Particle effects: Dust, debris, atmospheric elements
- Weight and momentum: Realistic physics

Technical Specifications:
- Resolution: 4K/8K
- Frame Rate: ${fps} FPS (cinematic)
- Aspect Ratio: ${input.aspectRatio}
- Render: ${input.style === "pixar" ? "Pixar Quality 3D" : "Unreal Engine 5 / Cinematic Quality"}

AVOID: ${negativePrompt}, fast jerky motion, inconsistent character, abrupt cuts, floaty movement`;

  return {
    analysis,
    startFrame,
    endFrame,
    videoPrompt
  };
}
