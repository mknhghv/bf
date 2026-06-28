
-- ==========================================
-- ✨ 下方繼續接你原本的 UI 搭建與驗證代碼...
-- ==========================================

-- [[ 🦈 Iruka Hub 終極穿透版載入器 ]]
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local CoreGui = game:GetService("CoreGui")
local LocalPlayer = Players.LocalPlayer

-- 🌐 填入你的 Vercel 後端網址
local BACKEND_URL = "https://irukascript.vercel.app/api/verify"

-- UI 核心部分保持原樣
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "\AuthUI"
if CoreGui:FindFirstChild("IrukaAuthUI") then CoreGui.IrukaAuthUI:Destroy() end
ScreenGui.Parent = CoreGui

local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 350, 0, 220)
MainFrame.Position = UDim2.new(0.5, -175, 0.5, -110)
MainFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
MainFrame.Active = true
MainFrame.Parent = ScreenGui

local UICorner = Instance.new("UICorner")
UICorner.CornerRadius = UDim.new(0, 12)
UICorner.Parent = MainFrame

local TitleLabel = Instance.new("TextLabel")
TitleLabel.Size = UDim2.new(1, 0, 0, 45)
TitleLabel.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
TitleLabel.Text = "Specter Hub - 安全驗證中心"
TitleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
TitleLabel.TextSize = 16
TitleLabel.Font = Enum.Font.GothamBold
TitleLabel.Parent = MainFrame

local CloseButton = Instance.new("TextButton")
CloseButton.Size = UDim2.new(0, 30, 0, 30)
CloseButton.Position = UDim2.new(1, -40, 0, 7)
CloseButton.BackgroundColor3 = Color3.fromRGB(231, 76, 60)
CloseButton.Text = "X"
CloseButton.TextColor3 = Color3.fromRGB(255, 255, 255)
CloseButton.ZIndex = 5
CloseButton.Parent = MainFrame

CloseButton.Activated:Connect(function() ScreenGui:Destroy() end)

local TextBox = Instance.new("TextBox")
TextBox.Size = UDim2.new(1, -40, 0, 40)
TextBox.Position = UDim2.new(0, 20, 0, 95)
TextBox.BackgroundColor3 = Color3.fromRGB(35, 35, 45)
TextBox.Text = ""
TextBox.PlaceholderText = "請輸入卡密..."
TextBox.TextColor3 = Color3.fromRGB(255, 255, 255)
TextBox.Parent = MainFrame

local VerifyButton = Instance.new("TextButton")
VerifyButton.Size = UDim2.new(1, -40, 0, 45)
VerifyButton.Position = UDim2.new(0, 20, 0, 150)
VerifyButton.BackgroundColor3 = Color3.fromRGB(55, 120, 250)
VerifyButton.Text = "開始驗證"
VerifyButton.TextColor3 = Color3.fromRGB(255, 255, 255)
VerifyButton.Font = Enum.Font.GothamBold
VerifyButton.Parent = MainFrame

-- ==========================================
-- 🚀 終極強效發送邏輯
-- ==========================================
VerifyButton.Activated:Connect(function()
    local inputKey = TextBox.Text
    inputKey = string.gsub(inputKey, "%s+", "") -- 清除空白
    inputKey = string.gsub(inputKey, "[\r\n]", "")

    if inputKey == "" then
        VerifyButton.Text = "❌ 請先輸入卡密！"
        task.wait(1.5)
        VerifyButton.Text = "開始驗證"
        return
    end
    
    VerifyButton.Text = "⚡ 正在進行全協議對齊..."
    VerifyButton.Active = false
    
    -- 🚀 雙管齊下 1：網址後面帶參數，並加上時間戳破快取
    local targetUrl = "https://irukascript.vercel.app/api/verify?key=" .. HttpService:UrlEncode(inputKey) .. "&nocache=" .. tostring(os.time())
    
    local sendRequest = syn and syn.request or http and http.request or request or (Fluxus and Fluxus.request)
    
    if sendRequest then
        local success, res = pcall(function()
            return sendRequest({
                Url = targetUrl,
                Method = "GET",
                Headers = {
                    ["Content-Type"] = "application/json",
                    ["Iruka-Key"] = inputKey,   -- 🚀 雙管齊下 2：Headers 大寫
                    ["iruka-key"] = inputKey    -- 🚀 雙管齊下 3：Headers 小寫
                }
            })
        end)
        
        if success and res and res.Body then
            local decodeSuccess, data = pcall(function() return HttpService:JSONDecode(res.Body) end)
            if decodeSuccess and data.success then
                VerifyButton.Text = "✅ 歡迎，" .. tostring(data.user) .. "！載入中..."
                VerifyButton.BackgroundColor3 = Color3.fromRGB(46, 204, 113)
                task.wait(1)
                ScreenGui:Destroy()
                if data.scriptData then
                    local runScript = loadstring(data.scriptData)
                    if runScript then pcall(runScript) end
                end
            else
                local errMsg = data and data.message or "卡密驗證失敗"
                VerifyButton.Text = "❌ " .. tostring(errMsg)
                VerifyButton.BackgroundColor3 = Color3.fromRGB(231, 76, 60)
            end
        else
            VerifyButton.Text = "❌ 請求失敗，嘗試底層繞過..."
            task.wait(1)
            pcall(function() return game:HttpGet(targetUrl) end)
        end
    else
        -- 傳統萬用 HttpGet 管道
        local subSuccess, subRes = pcall(function() return game:HttpGet(targetUrl) end)
        if subSuccess and subRes then
            local decodeSuccess, data = pcall(function() return HttpService:JSONDecode(subRes) end)
            if decodeSuccess and data.success then
                VerifyButton.Text = "✅ 歡迎，" .. tostring(data.user) .. "！載入中..."
                VerifyButton.BackgroundColor3 = Color3.fromRGB(46, 204, 113)
                task.wait(1)
                ScreenGui:Destroy()
                if data.scriptData then local runScript = loadstring(data.scriptData) if runScript then pcall(runScript) end end
            else
                local errMsg = data and data.message or "驗證失敗"
                VerifyButton.Text = "❌ " .. tostring(errMsg)
            end
        else
            VerifyButton.Text = "❌ 傳統傳輸協議失敗"
        end
    end
    
    task.wait(2)
    VerifyButton.BackgroundColor3 = Color3.fromRGB(55, 120, 250)
    VerifyButton.Text = "開始驗證"
    VerifyButton.Active = true
end)
