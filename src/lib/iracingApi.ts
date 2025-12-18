import "dotenv/config"; // o require('dotenv').config();
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { guardarJSON } from "../functions/prepareDataSeason";
import crypto from "node:crypto";

const CLIENT_ID = process.env.IRACING_CLIENT_ID!;
const CLIENT_SECRET = process.env.IRACING_CLIENT_SECRET!;
const IRACING_EMAIL = process.env.IRACING_EMAIL!;
const IRACING_PASSWORD = process.env.IRACING_PASSWORD!;
const TOKEN_URL = "https://oauth.iracing.com/oauth2/token";

interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

function mask(secret, id) {
    const hasher = crypto.createHash("sha256");
    const normalized_id = id.trim().toLowerCase();

    hasher.update(`${secret}${normalized_id}`);

    return hasher.digest("base64");
}

let cachedToken: { token: string; expiresAt: number } | null = null;

// Función para obtener access token (con caching simple)
async function getAccessToken(): Promise<string> {
    const now = Date.now();

    // 1️⃣ Usar cache si aún es válido
    if (cachedToken && now < cachedToken.expiresAt) {
        return cachedToken.token;
    }

    // 2️⃣ Authorization Basic (Base64 estándar)
    const maskSecret = mask(CLIENT_SECRET, CLIENT_ID);
    const maskPassword = mask(IRACING_PASSWORD, IRACING_EMAIL);

    // 3️⃣ Body correcto para iRacing
    const body = new URLSearchParams();
    body.append("grant_type", "password_limited");
    body.append("username", IRACING_EMAIL); // tu email de iRacing
    body.append("password", maskPassword); // tu password de iRacing
    body.append("client_id", CLIENT_ID);
    body.append("client_secret", maskSecret);
    body.append("scope", "iracing.auth");

    console.log(body);
    

    // 4️⃣ Request token
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error token iRacing: ${text}`);
    }

    // 5️⃣ Tipado con la interfaz
    const json: TokenResponse = await res.json();

    // 6️⃣ Guardar en cache
    cachedToken = {
        token: json.access_token,
        expiresAt: now + json.expires_in * 1000 - 60_000, // margen 1 min
    };

    return json.access_token;
}

// Función genérica para descargar cualquier endpoint
export async function downloadData(endpoint?: string, fileName?: string): Promise<string> {
    const token = await getAccessToken();
    const apiUrl = `https://members-ng.iracing.com/data/${endpoint}`;

    const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok){
        const text = await res.text();
        throw new Error(`Request failed: ${text}`);
    }
        

    const { link } = await res.json();
    // const  link  = 'https://thesimpsonsapi.com/api/' + endpoint;
    const dataRes = await fetch(link);
    const data = await dataRes.json();

    const folder = path.resolve(`./src/data/`);

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const fileNameDownloaded = "API_" + fileName + ".json";
    const filePath = path.join(folder, fileNameDownloaded);

    guardarJSON(filePath, data);

    console.log(`✅ JSON guardado en ${filePath}`);

    return filePath;
}
