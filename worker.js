const cors = { 'Access-Control-Allow-Origin': '*' };
export default {
  async fetch(req) {
    const t = new URL(req.url).searchParams.get('u');
    if (!t || !/^https:\/\/(api|uploads)\.mangadex\.org\//.test(t))
      return new Response('bad request', { status: 400, headers: cors });
    const r = await fetch(t, { headers: { 'User-Agent': 'PhimDem/1.0' } });
    return new Response(r.body, {
      status: r.status,
      headers: { ...cors, 'Content-Type': r.headers.get('content-type') || 'application/json' }
    });
  }
};
