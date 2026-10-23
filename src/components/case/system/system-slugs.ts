/** Case studies on the shared sheet system. Omantel stays on its own page class. */
export const systemCaseSlugs = new Set<string>([
  "disaster-recovery",
  "warehouse-operations",
]);

export function isSystemCase(slug: string): boolean {
  return systemCaseSlugs.has(slug);
}
