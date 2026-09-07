import { saveKey } from './database.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { hwid } = req.query;
    if (!hwid) {
        return res.status(400).json({ status: "error", message: "Thiếu HWID thiết bị" });
    }

    const API_TOKEN = "68b3dda628184c43725cb671"; // Token Link4m của bạn
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';

    // Tạo Key ngẫu nhiên mới
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
    const generatedKey = `TLONG-${randomHex()}-${randomHex()}`;

    // Lưu đè Key mới vào HWID này
    saveKey(hwid, generatedKey);

    // Link trả về sau khi vượt xong
    const destinationUrl = `${protocol}://${host}/?getkey=true&key=${generatedKey}&hwid=${encodeURIComponent(hwid)}`;
    const link4mQuickUrl = `https://link4m.co/st?api=${API_TOKEN}&url=${encodeURIComponent(destinationUrl)}`;

    return res.json({ status: "success", shortenedUrl: link4mQuickUrl });
}
