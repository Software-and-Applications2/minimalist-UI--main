import { readFileSync } from "fs";
import path from "path";

const configPath = path.join(__dirname, "admin-config.json");
let adminPassword = process.env.ADMIN_PASSWORD;
try {
  const cfg = JSON.parse(readFileSync(configPath, "utf8"));
  if (cfg.adminPassword) adminPassword = cfg.adminPassword;
} catch {}
if (!adminPassword) adminPassword = "admin@123"; // temporary fallback

export const handler = async (event, context) => {
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
    if (!adminPassword) {
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: "Server config error" }) };
    }
    if (password === adminPassword) {
      const token = "admin_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, token }) };
    }
    return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: "Invalid password" }) };
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: "Invalid request" }) };
  }
};

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
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: "Invalid request" }) };
  }
};
