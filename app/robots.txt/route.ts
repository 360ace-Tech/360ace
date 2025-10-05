const ROBOTS = `User-agent: *
Allow: /
Sitemap: https://360ace.net/sitemap.xml`;

export function GET() {
  return new Response(ROBOTS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
