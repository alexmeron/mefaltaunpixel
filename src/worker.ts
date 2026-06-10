/// <reference types="@cloudflare/workers-types" />

interface Env {
  PORTFOLIO_DATA: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/likes') {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
      }

      const LIKES_KEY = 'global_likes_count';

      try {
        if (request.method === 'GET') {
          let likes = await env.PORTFOLIO_DATA.get(LIKES_KEY);
          if (!likes) {
            likes = '124';
            await env.PORTFOLIO_DATA.put(LIKES_KEY, likes);
          }
          return new Response(JSON.stringify({ likes: parseInt(likes, 10) }), { headers });
        }

        if (request.method === 'POST') {
          let likes = await env.PORTFOLIO_DATA.get(LIKES_KEY);
          let newLikes = likes ? parseInt(likes, 10) + 1 : 125;
          await env.PORTFOLIO_DATA.put(LIKES_KEY, newLikes.toString());
          return new Response(JSON.stringify({ likes: newLikes }), { headers });
        }

        return new Response('Method Not Allowed', { status: 405, headers });

      } catch (error) {
        console.error('Error with KV:', error);
        if (request.method === 'GET') {
          return new Response(JSON.stringify({ likes: 124 }), { headers });
        }
        return new Response(JSON.stringify({ error: 'Failed to access KV' }), { status: 500, headers });
      }
    }

    // Para el resto de rutas, servir assets estáticos
    // @ts-ignore
    let response = await env.ASSETS.fetch(request);

    // Si es el sitemap, forzar Content-Type application/xml
    if (url.pathname === '/sitemap.xml' && response.status === 200) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Content-Type', 'application/xml');
      return newResponse;
    }

    // Implicit index.html resolution para subrutas
    if (response.status === 404 && !url.pathname.includes('.')) {
      const newUrl = new URL(url.toString());
      if (!newUrl.pathname.endsWith('/')) {
        newUrl.pathname += '/';
      }
      newUrl.pathname += 'index.html';
      const newRequest = new Request(newUrl, request);
      // @ts-ignore
      response = await env.ASSETS.fetch(newRequest);
    }

    return response;
  }
};
