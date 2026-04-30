import { getStore } from '@netlify/blobs';

export default async function handler(req: Request) {
  // Configurar cabeceras CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const store = getStore('portfolio_data');
    const LIKES_KEY = 'global_likes_count';

    if (req.method === 'GET') {
      let likes = await store.get(LIKES_KEY);
      if (!likes) {
        likes = '124'; // Valor inicial
        await store.set(LIKES_KEY, likes);
      }
      return new Response(JSON.stringify({ likes: parseInt(likes, 10) }), { headers });
    }

    if (req.method === 'POST') {
      let likes = await store.get(LIKES_KEY);
      let newLikes = likes ? parseInt(likes, 10) + 1 : 125;
      await store.set(LIKES_KEY, newLikes.toString());

      return new Response(JSON.stringify({ likes: newLikes }), { headers });
    }

    return new Response('Method Not Allowed', { status: 405, headers });
  } catch (error) {
    console.error('Error with Netlify Blobs:', error);
    // Fallback gracefully so the UI doesn't crash if Blobs aren't configured locally
    if (req.method === 'GET') {
      return new Response(JSON.stringify({ likes: 124 }), { headers });
    }
    return new Response(JSON.stringify({ error: 'Failed to access store' }), { status: 500, headers });
  }
}

export const config = {
  path: "/api/likes"
};
