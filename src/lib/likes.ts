const MAX_LIKES_PER_ARTICLE = 5;

const memoryStore: Record<string, number> = {};

export function getUserLikes(slug: string): number {
  return memoryStore[slug] ?? 0;
}

export function addLike(slug: string): number {
  const current = memoryStore[slug] ?? 0;
  if (current >= MAX_LIKES_PER_ARTICLE) return current;
  const next = current + 1;
  memoryStore[slug] = next;
  return next;
}

export function canLike(slug: string): boolean {
  return getUserLikes(slug) < MAX_LIKES_PER_ARTICLE;
}

export { MAX_LIKES_PER_ARTICLE };
