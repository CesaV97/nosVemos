/**
 * Worker que sirve archivos estáticos desde Cloudflare
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Intentar obtener el archivo solicitado
    const response = await env.ASSETS.fetch(request);

    // Si no se encuentra (404) y no es un archivo con extensión,
    // servir index.html para SPA routing
    if (response.status === 404 && !path.includes('.')) {
      const indexRequest = new Request(new URL('/index.html', url), request);
      return env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
