export const normalizeTag = (tag: string) => tag.trim();

export const sortTags = (tags: string[]) =>
  [...tags].sort((a, b) => a.localeCompare(b));

export const findExistingTag = (
  tags: string[],
  candidate: string
): string | null => {
  const normalized = candidate.trim().toLowerCase();

  if (!normalized) return null;

  return (
    tags.find(
      (tag) => tag.toLowerCase() === normalized
    ) ?? null
  );
};