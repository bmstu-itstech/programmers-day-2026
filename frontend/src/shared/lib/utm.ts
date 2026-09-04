export function getUtmSource(): string | null {
  const utmSource = new URLSearchParams(window.location.search)
    .get('utm_source')
    ?.trim();

  return utmSource || null;
}
