export function buildSlugPrefix(slug) {
  return `${slug?.startsWith('/') ? '' : '/'}${slug}`;
}
