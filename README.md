# 香茅廚房 Lemongrass Kitchen — 線上菜單

手機版靜態餐廳菜單，支援繁中／英文／日文／韓文四語言切換。

**線上網址：** `https://<your-github-username>.github.io/lemongrass-menu/`

---

## 本地開發

```bash
npm install       # 第一次需執行
npm run dev       # 啟動開發伺服器，開啟 http://localhost:5173/lemongrass-menu/
```

---

## 建置與預覽

```bash
npm run build     # 輸出至 dist/
npm run preview   # 本地預覽 build 結果（http://localhost:4173/lemongrass-menu/）
```

---

## GitHub Pages 部署

### 第一次設定（只需做一次）

1. 進入 GitHub Repository → **Settings** → **Pages**
2. **Source** 選擇 **GitHub Actions**（不是選 branch）
3. 儲存後，下次 push 到 `main` 就會自動部署

### 自動部署流程

- 每次 push 到 `main` 分支後，GitHub Actions 會自動執行：
  1. `npm ci` — 安裝套件
  2. `npm run build` — 建置靜態檔案
  3. 上傳 `dist/` 至 GitHub Pages

- 可在 Repository → **Actions** 頁籤查看執行狀態
- 部署完成後網址為：`https://<username>.github.io/lemongrass-menu/`

---

## 如何修改菜單資料

> 店家日常維護只需編輯 `src/data/menu-raw.ts`（純中文，格式簡單）。  
> 若要更新翻譯，再同步編輯 `src/data/menu-i18n.ts`。

### 新增品項

在 `src/data/menu-raw.ts` 中複製一個現有區塊，修改內容：

```ts
{
  category: 'main',          // 'main' 主餐 | 'side' 單點 | 'dessert' 甜點 | 'drink' 飲料
  name: '新品項名稱',
  options: ['270'],          // 單一價格
  // options: ['大 510', '小 270'],       // 分大小
  // options: ['烤雞腿 270', '牛肉 340'], // 分主食
  // options: ['時價'],                   // 時價
  tags: ['R'],               // 標記代碼，無則填 []
  image: null,               // 圖片檔名或 null
  emoji: '🍛',               // 無圖片時的替代圖示
  note: '',                  // 中文備註，不需要填 ''
},
```

### 標記代碼對照表

| 代碼 | 圖示 | 中文 |
|------|------|------|
| `R` | ⭐ | 本店推薦 |
| `1` | 🌶️ | 小辣 |
| `2` | 🌶️🌶️ | 中辣 |
| `3` | 🔥 | 大辣 |
| `P` | 🐷 | 含豬肉 |
| `B` | 🐂 | 含牛肉 |
| `L` | 🐑 | 含羊肉 |
| `V` | 🥬 | 素食 |
| `H` | ☪️ | 清真認證 |

### 新增菜品照片

1. 將照片放入 `public/images/` 資料夾（建議 JPG，長寬比 1:1 或 4:3）
2. 在 `src/data/menu-raw.ts` 對應品項的 `image` 欄位填入檔名：
   ```ts
   image: 'red-curry.jpg',
   ```
3. 同步更新 `src/data/menu-i18n.ts` 中對應品項的 `image` 欄位
4. Push 到 `main` → 自動部署

### 更新翻譯（menu-i18n.ts）

`src/data/menu-i18n.ts` 是前端實際讀取的四語言資料。  
新增品項時需同步在此檔加入對應的多語言物件，格式參考現有品項。

---

## 專案結構

```
src/
├── components/
│   ├── Header.tsx            # 店名 + 用餐資訊
│   ├── LanguageSwitcher.tsx  # 語言切換列（sticky）
│   ├── CategoryNav.tsx       # 分類快捷列（sticky）
│   ├── MenuSection.tsx       # 單一分類區塊
│   ├── MenuCard.tsx          # 品項卡片
│   ├── TagBadge.tsx          # 標記 badge
│   └── ItemDetailModal.tsx   # 品項詳情 Modal
├── data/
│   ├── menu-raw.ts           # 店家維護用（純中文）
│   ├── menu-i18n.ts          # 四語言完整資料（前端讀取）
│   ├── tags.ts               # 標記系統定義
│   └── site-info.ts          # 店名、規則等常量
├── hooks/
│   └── useLanguage.ts        # 語言狀態管理
└── types/
    └── menu.ts               # TypeScript 型別定義
public/
└── images/                   # 菜品照片放這裡
```

---

## 技術棧

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- 部署：GitHub Pages（GitHub Actions）
