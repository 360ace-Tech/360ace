const BASE_URL = 'https://360ace.net';
const PAGES = ['/', '/consulting', '/contact', '/legal/privacy', '/legal/terms'];

export function GET() {
  const urls = PAGES.map(
    (path) =>
      `<url><loc>${BASE_URL}${path}</loc><changefreq>monthly</changefreq><priority>${path === '/' ? '1.0' : '0.6'}</priority></url>`,
  ).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
