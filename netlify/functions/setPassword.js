const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "admin-config.json");

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
    const { newPassword, token } = JSON.parse(event.body || "{}");

    if (!newPassword || !token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: "Missing fields" }),
      };
    }

    // Simple token validation: must start with 'admin_'
    if (!token.startsWith("admin_")) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: "Invalid token" }),
      };
    }

    writeFileSync(configPath, JSON.stringify({ adminPassword: newPassword }, null, 2), "utf8");

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: e.message }),
    };
  }
};
