# Claude Code 執行指令：香茅廚房線上菜單

## 專案概述

基於以下檔案與設計：

- `@menu_design.pen`：Pencil.dev 設計稿
- `@menu-design-prompt.md`：設計規格文件
- `@menu.jpeg`：原始手寫菜單
- `@README.md`：專案說明文件

使用 **React + Vite + TypeScript** 建置一個 **手機專用** 的靜態餐廳菜單網站，並部署到本 Repository 的 **GitHub Pages**。

## 專案目標

建立一個以 **375px 手機版介面** 為核心的多語餐廳線上菜單，支援：

- 繁體中文 / English / 日本語 / 한국어 四語言切換
- 分類瀏覽與 smooth scroll
- 菜品標記 badge
- 品項詳情 Modal
- emoji fallback
- GitHub Pages 自動部署

---

## Tech Stack

- **框架**：React 18 + TypeScript
- **建置工具**：Vite 6
- **樣式**：CSS Modules 或 Tailwind CSS v4（依設計稿複雜度選擇，優先 Tailwind）
- **部署**：GitHub Pages（透過 GitHub Actions 自動部署）
- **不使用**任何後端、資料庫、SSR 或 API 呼叫

---

## 專案結構

```
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions：build → 部署至 GitHub Pages
├── docs/
│   └── screenshots/             # 放最終版截圖畫面
├── public/
│   └── images/                  # 菜品照片，檔名對應 menu-raw.ts 中的 image 欄位
│       └── .gitkeep
├── src/
│   ├── data/
│   │   ├── menu-raw.ts          # 店家維護的簡化菜單原始資料（純中文）
│   │   ├── menu-i18n.ts         # 完整四語言菜單資料（build script 或手動產生）
│   │   ├── tags.ts              # 標記系統定義（代碼 → 圖示 + 四語言文字）
│   │   └── site-info.ts         # 店家資訊、用餐規則等多語言常量
│   ├── components/
│   │   ├── Header.tsx           # 店名 + 形象圖 + 用餐資訊
│   │   ├── LanguageSwitcher.tsx # 語言切換按鈕（sticky）
│   │   ├── CategoryNav.tsx      # 分類快捷跳轉列（sticky，在語言切換下方）
│   │   ├── MenuSection.tsx      # 單一分類區塊（標題 + 品項卡片列表）
│   │   ├── MenuCard.tsx         # 品項卡片（照片/emoji、名稱、價格、標記 badge）
│   │   ├── ItemDetailModal.tsx  # 品項詳情 Overlay（大圖、縮放、說明、備註）
│   │   └── TagBadge.tsx         # 標記小徽章元件
│   ├── hooks/
│   │   └── useLanguage.ts       # 語言狀態管理（Context + hook）
│   ├── types/
│   │   └── menu.ts              # TypeScript 型別定義
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
├── menu-design-prompt.md
├── menu_design.pen
└── menu.jpeg
```

---

## 資料流

```
menu-raw.ts（店家編輯，全中文）
       │
       ▼
menu-i18n.ts（完整四語言資料，翻譯後放入此檔）
       │
       ▼
  React 元件讀取 menu-i18n.ts → 依使用者選擇語言渲染
```

### menu-raw.ts

格式與 `menu-design-prompt.md` 中「9-1. 簡化輸入格式」一致。這是店家人員實際會編輯的檔案。請從該文件中複製完整的 `menuRaw` 陣列作為初始資料。

### menu-i18n.ts

完整的四語言資料。初次建立時，請根據 `menu-raw.ts` 的中文內容，將所有品項名稱、規格標籤（大/小、杯/壺、烤雞腿/牛肉/蔬食等）、備註翻譯為英文、日文、韓文，寫入此檔。格式依 `menu-design-prompt.md` 中「9-2. 完整渲染格式」。

---

## 設計參考

1. **優先**從 `@menu_design.pen` 透過 Pencil MCP 讀取設計稿的色彩、字體、間距、元件佈局
2. 若設計稿中未定義的細節，參考 `menu-design-prompt.md` 中的設計規範（第三節）
3. 整體視覺以 375px 寬手機為目標，不需額外處理桌面或平板
4. UI 需貼近最終設計稿，不可自行加上與設計稿無關的多餘功能


---

## 功能需求

請完整實作 `menu-design-prompt.md` 中第四至第十節的所有功能，重點摘要：

### 必要功能清單

- [ ] **Header**：店名（香茅廚房 Lemongrass Kitchen）、形象圖片、用餐限時 90 分鐘與低消 NT$300（多語言）
- [ ] **語言切換**：繁中/英/日/韓，sticky 定位，切換不重載頁面
- [ ] **分類快捷列**：sticky，點擊後 smooth scroll 至對應區塊，active 狀態可隨捲動更新
- [ ] **品項卡片**：照片（或 emoji fallback）、多語言名稱、價格含規格、標記 badge
- [ ] **品項詳情 Modal**：Overlay 開啟、大圖可 pinch-to-zoom、說明與備註欄位、點擊外部或關閉鈕回到原位
- [ ] **標記系統**：依 `menu-design-prompt.md` 第八節的標記對照表實作，不可自行新增或推測標記
- [ ] **圖片 lazy loading**
- [ ] **價格格式**：所有價格顯示 NT$，多規格顯示邏輯需清楚

### 圖片處理

- 品項的 `image` 欄位若有值，從 `/images/{檔名}` 載入
- 若 `image` 為 `null`，以該品項的 `emoji` 欄位放大居中顯示作為替代
- 之後店家只要將照片放入 `public/images/` 並更新 `menu-raw.ts` 的 `image` 欄位即可

---

## GitHub Pages 部署

### vite.config.ts

需設定 `base` 為本 Repository 名稱，使 GitHub Pages 路徑正確：

```ts
export default defineConfig({
  base: '/lemongrass-menu/',  // 替換為實際 repo 名稱
  // ...
})
```

> 如果 repo 設定為使用自訂域名或是 `<username>.github.io` 主站，`base` 設為 `'/'`。

### GitHub Actions Workflow（.github/workflows/deploy.yml）

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

### GitHub Repository 設定

部署後需在 GitHub 上確認以下設定：

1. 進入 Repository → **Settings** → **Pages**
2. **Source** 選擇 **GitHub Actions**（不是選 branch）
3. 首次 push 到 main 後 workflow 會自動執行，完成後即可透過 `https://chengzho.github.io/lemongrass-menu/` 存取

---

## 本地開發

```bash
npm install
npm run dev      # 啟動 Vite dev server，預設 http://localhost:5173
npm run build    # 建置至 dist/
npm run preview  # 本地預覽 build 結果
```

---

## 注意事項

- 所有翻譯（英文、日文、韓文）請盡量準確，菜名翻譯以觀光客能理解為優先，不需要逐字直譯
- `menu-design-prompt.md` 中的標記定義表（第七節）是唯一的標記來源，不要自行新增或推測品項的標記
- 確保 Modal 開啟時 body 不可捲動，關閉後恢復捲動位置
- 整個專案不應有任何 API 呼叫或外部資料依賴，所有資料都從 `src/data/` 靜態載入
