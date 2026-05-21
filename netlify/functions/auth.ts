import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false }) };
  }

  try {
    const { password } = JSON.parse(event.body || "{}");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: "Server config error" }) };
    }

    if (password === adminPassword) {
      const token = "admin_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, token }) };
    }

    return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: "Invalid password" }) };
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: "Invalid request" }) };
  }
};

export { handler };
