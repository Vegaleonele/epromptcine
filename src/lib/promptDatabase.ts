import { supabase } from "@/integrations/supabase/client";
import type { SceneDetails } from "@/types/prompt";
import type { Json } from "@/integrations/supabase/types";

export interface DatabasePrompt {
  id: string;
  user_id: string;
  brief: string;
  style: string;
  custom_style: string | null;
  analysis: string | null;
  start_frame: string | null;
  end_frame: string | null;
  video_prompt: string | null;
  scene_details: SceneDetails | null;
  aspect_ratio: string | null;
  duration: string | null;
  fps: string | null;
  created_at: string;
}

export async function savePromptToDatabase(prompt: {
  brief: string;
  style: string;
  customStyle?: string;
  analysis: string;
  startFrame: string;
  endFrame: string;
  videoPrompt: string;
  sceneDetails?: SceneDetails;
  aspectRatio?: string;
  duration?: string;
  fps?: string;
}): Promise<{ data: DatabasePrompt | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: new Error("Not authenticated") };
  }

  const insertData = {
    user_id: user.id,
    brief: prompt.brief,
    style: prompt.style,
    custom_style: prompt.customStyle || null,
    analysis: prompt.analysis,
    start_frame: prompt.startFrame,
    end_frame: prompt.endFrame,
    video_prompt: prompt.videoPrompt,
    scene_details: (prompt.sceneDetails as unknown as Json) || null,
    aspect_ratio: prompt.aspectRatio || null,
    duration: prompt.duration || null,
    fps: prompt.fps || null
  };

  const { data, error } = await supabase
    .from("saved_prompts")
    .insert([insertData])
    .select()
    .single();

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return { 
    data: {
      ...data,
      scene_details: data.scene_details as unknown as SceneDetails | null
    }, 
    error: null 
  };
}

export async function getPromptsFromDatabase(): Promise<{ data: DatabasePrompt[]; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: [], error: new Error("Not authenticated") };
  }

  const { data, error } = await supabase
    .from("saved_prompts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return { data: [], error: new Error(error.message) };
  }

  return { 
    data: (data || []).map(item => ({
      ...item,
      scene_details: item.scene_details as unknown as SceneDetails | null
    })), 
    error: null 
  };
}

export async function deletePromptFromDatabase(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from("saved_prompts")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: new Error(error.message) };
  }

  return { error: null };
}
