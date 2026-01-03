export const normalizeTag = (tag: string) => tag.trim();


export const sortTags = (tags: string[]) =>
  [...tags].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));


export const findExistingTag = (
  tags: string[],
  candidate: string
): string | null => {
  const normalized = candidate.trim().toLowerCase();
  if (!normalized) return null;


  return tags.find((tag) => tag.toLowerCase() === normalized) ?? null;
};

/**
 * Add a tag if it doesn't exist (case-insensitive)
 */
export const addTag = (tags: string[], newTag: string): { tags: string[]; message?: string } => {
  const normalized = normalizeTag(newTag);
  if (!normalized) return { tags };

  const found = findExistingTag(tags, normalized);
  if (found) return { tags, message: `Tag already exists as "${found}"` };

  return { tags: [...tags, normalized] };
};

/**
 * Rename a tag
 */
export const renameTag = (
  tags: string[],
  oldTag: string,
  newTag: string
): { tags: string[]; message?: string } => {
  const normalized = normalizeTag(newTag);
  if (!normalized) return { tags };

  const found = findExistingTag(tags, normalized);
  if (found) return { tags, message: `Tag already exists as "${found}"` };

  return {
    tags: tags.map((t) => (t === oldTag ? normalized : t)),
  };
};

/**
 * Delete a tag
 */
export const deleteTag = (tags: string[], tagToDelete: string): string[] =>
  tags.filter((t) => t !== tagToDelete);