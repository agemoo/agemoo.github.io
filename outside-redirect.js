export const OUTSIDE_ROUTES = Object.freeze({
  '#outside-music': 'music.html',
  '#outside-photography': 'photography.html',
  '#outside-travel': 'travel.html',
});

export function resolveOutsideRoute(hash = '') {
  return OUTSIDE_ROUTES[hash] ?? 'index.html#outside-work';
}

export function mountOutsideRedirect(locationLike = globalThis.location) {
  if (!locationLike?.replace) return '';
  const target = resolveOutsideRoute(locationLike.hash);
  locationLike.replace(target);
  return target;
}

if (typeof window !== 'undefined') mountOutsideRedirect(window.location);
