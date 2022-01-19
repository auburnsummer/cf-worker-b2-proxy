import { makeThumbnail } from "./thumbnail";

const b2Url = "https://f000.backblazeb2.com/file/rhythm-cafe";

const getB2Url = (file: string) => `${b2Url}/${file}`;

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname, searchParams } = new URL(request.url);

  // remove the leading /
  const filename = pathname.slice(1);

  const toGet = getB2Url(filename);

  const resp = await fetch(toGet, {
    cf: {
      cacheEverything: true,
      cacheTtl: 3600 // 1 hour
    }
  });


  const processedBody =
    searchParams.has('thumbnail') && resp.body != null
      ? makeThumbnail(await resp.arrayBuffer())
      : resp.body;

  const newResp = new Response(processedBody, resp);
  newResp.headers.set('Cache-Control', "max-age=86400"); // 1 day

  return newResp;
}
