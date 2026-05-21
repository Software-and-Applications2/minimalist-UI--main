const { readFileSync } = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "admin-config.json");

function getAdminPassword() {
  // 1. Try env var first (highest priority)
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  // 2. Try config file
  try {
    const cfg = JSON.parse(readFileSync(configPath, "utf8"));
    if (cfg.adminPassword) return cfg.adminPassword;
  } catch {}
  // 3. Temporary fallback
  return "admin@123";
}

exports.handler = async (event, context) => {
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
    const adminPassword = getAdminPassword();

    if (password === adminPassword) {
      const token =
        "admin_" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, token }) };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, message: "Invalid password" }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, message: "Invalid request" }),
    };
  }
};
