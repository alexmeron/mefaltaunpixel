export async function onRequest(context) {
  const { request, env } = context;

  // Set up CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // Check if the KV namespace is bound. 
    // The user needs to bind a KV namespace named PORTFOLIO_DATA in the Cloudflare dashboard.
    if (!env.PORTFOLIO_DATA) {
      console.warn("KV namespace PORTFOLIO_DATA not bound. Falling back to default.");
      return new Response(JSON.stringify({ likes: 125 }), { headers });
    }

    const LIKES_KEY = 'global_likes_count';

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

    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers });
  } catch (error) {
    console.error('Error with KV:', error);
    if (request.method === 'GET') {
      return new Response(JSON.stringify({ likes: 124 }), { headers });
    }
    return new Response(JSON.stringify({ error: 'Failed to access store' }), { status: 500, headers });
  }
}
