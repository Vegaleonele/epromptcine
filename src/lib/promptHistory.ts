export interface SavedPrompt {
  id: string;
  brief: string;
  style: string;
  analysis: string;
  startFrame: string;
  endFrame: string;
  videoPrompt: string;
  createdAt: string;
}

const STORAGE_KEY = "cineprompt_history";

export function getSavedPrompts(): SavedPrompt[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function savePrompt(prompt: Omit<SavedPrompt, "id" | "createdAt">): SavedPrompt {
  const prompts = getSavedPrompts();
  const newPrompt: SavedPrompt = {
    ...prompt,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  prompts.unshift(newPrompt);
  // Keep only last 50 prompts
  const trimmed = prompts.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return newPrompt;
}

export function deletePrompt(id: string): void {
  const prompts = getSavedPrompts();
  const filtered = prompts.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllPrompts(): void {
  localStorage.removeItem(STORAGE_KEY);
}
