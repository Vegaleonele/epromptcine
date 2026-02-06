export type FilmStyle = 
  | "pixar"
  | "realistic"
  | "epic"
  | "scifi"
  | "fantasy"
  | "horror"
  | "documentary"
  | "vintage"
  | "anime"
  | "other";

export interface FilmStyleConfig {
  id: FilmStyle;
  label: string;
  description: string;
  mood: string;
  lighting: string;
  camera: string;
  texture: string;
}

export const FILM_STYLES: FilmStyleConfig[] = [
  {
    id: "pixar",
    label: "Pixar / Animated",
    description: "Vibrant, whimsical, emotional warmth",
    mood: "vibrant, whimsical, emotional, warm",
    lighting: "soft rim light, gentle bounce, studio quality",
    camera: "smooth storytelling shots, slight exaggeration",
    texture: "clean 3D surfaces, expressive characters"
  },
  {
    id: "realistic",
    label: "Realistic / Live-Action",
    description: "Photorealistic, grounded, natural",
    mood: "photorealistic, grounded, natural, authentic",
    lighting: "natural or motivated light sources",
    camera: "classic cinematic, subtle movement",
    texture: "ultra-detailed skin, fabric, environment"
  },
  {
    id: "epic",
    label: "Epic / Sử Thi",
    description: "Grand, heroic, dramatic scale",
    mood: "grand, heroic, dramatic, awe-inspiring",
    lighting: "chiaroscuro, strong rim light, godrays",
    camera: "low-angle, wide shots, slow dolly",
    texture: "gritty, weathered, large scale environments"
  },
  {
    id: "scifi",
    label: "Sci-Fi / Futuristic",
    description: "Futuristic, cold, high-tech aesthetics",
    mood: "futuristic, cold, high-tech, mysterious",
    lighting: "neon accents, volumetric, lens flares",
    camera: "anamorphic lens, dynamic tracking",
    texture: "metallic, holographic, clean lines"
  },
  {
    id: "fantasy",
    label: "Fantasy / Magical",
    description: "Mystical, dark or magical worlds",
    mood: "mystical, enchanting, otherworldly",
    lighting: "volumetric fog, magical glow effects",
    camera: "low-angle epic, floating camera movement",
    texture: "organic, intricate details, ethereal"
  },
  {
    id: "horror",
    label: "Horror / Thriller",
    description: "Tense, oppressive, unsettling",
    mood: "tense, oppressive, unsettling, dread",
    lighting: "low-key, harsh shadows, contrast",
    camera: "Dutch angle, tight framing, slow push-in",
    texture: "grimy, decayed, distorted elements"
  },
  {
    id: "documentary",
    label: "Documentary",
    description: "Authentic, observational, natural",
    mood: "authentic, observational, intimate",
    lighting: "natural light, minimal artificial",
    camera: "mostly static or gentle handheld",
    texture: "film grain, realistic imperfection"
  },
  {
    id: "vintage",
    label: "Vintage / Retro",
    description: "Nostalgic, retro film aesthetics",
    mood: "nostalgic, retro, timeless",
    lighting: "warm sepia tones, film grain",
    camera: "classic film look, subtle vignette",
    texture: "scratches, faded colors, analog feel"
  },
  {
    id: "anime",
    label: "Anime",
    description: "Expressive, stylized animation",
    mood: "expressive, dynamic, stylized",
    lighting: "dramatic cel-shading, bold shadows",
    camera: "dynamic angles, speed lines, impact frames",
    texture: "clean lineart, vibrant saturated colors"
  },
  {
    id: "other",
    label: "Custom Style",
    description: "Describe your own visual style",
    mood: "",
    lighting: "",
    camera: "",
    texture: ""
  }
];

export interface SceneDetails {
  subject: string;
  action: string;
  environment: string;
  timeWeather: string;
  mood: string;
  shotType: string;
}

export interface PromptInput {
  brief: string;
  style: FilmStyle;
  customStyle?: string;
  sceneDetails: SceneDetails;
  aspectRatio: string;
  duration: string;
  fps: string;
}

export interface GeneratedPrompts {
  analysis: string;
  startFrame: string;
  endFrame: string;
  videoPrompt: string;
}
