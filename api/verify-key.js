import { validateKey } from './database.js';

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { hwid, key } = req.query;

    if (!hwid || !key) {
        return res.status(400).json({ valid: false, message: "Thiếu thông tin HWID hoặc Key" });
    }

    const result = validateKey(hwid, key);
    return res.json(result);
}
