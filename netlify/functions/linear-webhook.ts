const { createHmac } = require('node:crypto');

export default async (request: Request) => {
  const payload = await request.text();
  const { action, data, type, createdAt } = JSON.parse(payload);

  // Verify signature
  const signature = createHmac("sha256", Netlify.env.get('WEBHOOK_SECRET')).update(payload).digest("hex");

  if (signature !== request.headers.get('linear-signature')) {
    return new Response(null, { status: 400 })
  }

  // Do something neat with the data received!

  // Finally, respond with a HTTP 200 to signal all good
  return new Response(null, { status: 200 })
}

export const config = {
  path: "/my-linear-webhook"
};
