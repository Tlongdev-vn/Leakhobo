global.HWID_STORE = global.HWID_STORE || {};

export function saveKey(hwid, newKey) {
    const expireAt = Date.now() + 24 * 60 * 60 * 1000;
    global.HWID_STORE[hwid] = {
        key: newKey,
        expireAt: expireAt
    };
}

export function validateKey(hwid, inputKey) {
    const record = global.HWID_STORE[hwid];
    
    if (!record) {
        return { valid: false, message: "Thiết bị này chưa Get Key! Vui lòng vượt link." };
    }

    if (Date.now() > record.expireAt) {
        delete global.HWID_STORE[hwid];
        return { valid: false, message: "Key của bạn đã hết hạn 24h! Vui lòng vượt link lại." };
    }

    if (record.key !== inputKey) {
        return { valid: false, message: "Key không đúng hoặc đã bị thay thế bởi lần Get Key mới!" };
    }

    return { valid: true, message: "Xác thực Key thành công!" };
}
