import { saveKey } from './database.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { hwid } = req.query;
    if (!hwid) {
        return res.status(400).json({ status: "error", message: "Thiếu HWID thiết bị" });
    }

    const API_TOKEN = "68b3dda628184c43725cb671";
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';

    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
    const generatedKey = `TLONG-${randomHex()}-${randomHex()}`;

    saveKey(hwid, generatedKey);

    const destinationUrl = `${protocol}://${host}/?getkey=true&key=${generatedKey}&hwid=${encodeURIComponent(hwid)}`;
    const link4mQuickUrl = `https://link4m.co/st?api=${API_TOKEN}&url=${encodeURIComponent(destinationUrl)}`;

    return res.json({ status: "success", shortenedUrl: link4mQuickUrl });
}
