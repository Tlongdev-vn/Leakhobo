import { validateKey } from './database.js';

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { hwid, key } = req.query;

    if (!hwid || !key) {
        return res.status(400).json({ valid: false, message: "Thiếu thông tin HWID hoặc Key" });
    }

    const result = validateKey(hwid, key);
    return res.json(result);
}
