export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: '方法不允許' });
    }

    const { key } = req.body;

    // 🔒 從 Vercel 後台的安全環境變數讀取卡密字串
    // 我們在後台會把卡密用英文逗號隔開，例如: "Key1,Key2,Key3"
    const envKeys = process.env.VALID_KEYS || "";
    const validKeys = envKeys.split(',').map(k => k.trim());

    // 檢查卡密
    if (validKeys.includes(key)) {
        return res.status(200).json({
            success: true,
            message: '驗證成功！',
            scriptUrl: "https://raw.githubusercontent.com/mknhghv/irukascript/refs/heads/main/main.lua"
        });
    } else {
        return res.status(403).json({
            success: false,
            message: '卡密無效或已過期！'
        });
    }
}
