// ═══════════════════════════════════════════════════════════════════════════
//  菜單原始資料 — 餐廳業者在此編輯
//
//  欄位說明：
//    category  分類：'main' 主餐 | 'side' 單點 | 'dessert' 甜點 | 'drink' 飲料
//    name      品項中文名稱
//    options   價格選項，字串陣列：
//                不分規格 → ['270']
//                分規格   → ['烤雞腿 270', '牛肉 340', '蔬食 250']
//                分大小   → ['大 510', '小 270']
//                分杯壺   → ['杯 70', '壺 160']
//                時價     → ['時價']
//    tags      標記代碼陣列，無標記填 []
//    image     圖片檔名（放在 public/images/），尚無圖片填 null
//    emoji     無圖片時顯示的替代圖示
//    note      中文備註，不需要時填 ''
//
//  ★ 新增品項時，只要複製一個 { } 區塊，改掉內容即可
// ═══════════════════════════════════════════════════════════════════════════

export interface RawMenuItem {
  category: 'main' | 'side' | 'dessert' | 'drink';
  name: string;
  options: string[];
  tags: string[];
  image: string | null;
  emoji: string;
  note: string;
}

export const menuRaw: RawMenuItem[] = [

  // ── 主餐類 ──────────────────────────────────────────────────
  {
    category: 'main',
    name: '手作泰式紅咖哩',
    options: ['烤雞腿 270', '牛肉 340', '蔬食 250'],
    tags: ['R', '1', 'B'],
    image: null,
    emoji: '🍛',
    note: '',
  },
  {
    category: 'main',
    name: '手作泰式黃咖哩（微辣）',
    options: ['烤雞腿 250', '牛肉 320', '蔬食 230'],
    tags: ['1', 'B'],
    image: null,
    emoji: '🍛',
    note: '',
  },
  {
    category: 'main',
    name: '泰式檸檬蒸鱸魚',
    options: ['整尾 400', '半尾 240'],
    tags: [],
    image: null,
    emoji: '🐟',
    note: '',
  },
  {
    category: 'main',
    name: '酥炸無骨海鱸佐羅望子醬（不辣）',
    options: ['整尾 430', '半尾 240'],
    tags: ['R'],
    image: null,
    emoji: '🐟',
    note: '',
  },
  {
    category: 'main',
    name: '冬蔭功酸辣海鮮湯',
    options: ['小 270', '大 510'],
    tags: ['3'],
    image: null,
    emoji: '🍲',
    note: '',
  },
  {
    category: 'main',
    name: '南薑香茅椰奶雞湯（不辣）',
    options: ['小 250', '大 460'],
    tags: [],
    image: null,
    emoji: '🍲',
    note: '',
  },

  // ── 單點類 ──────────────────────────────────────────────────
  {
    category: 'side',
    name: '月亮蝦餅佐手工甜雞醬',
    options: ['大8片 310', '小4片 170'],
    tags: ['R'],
    image: null,
    emoji: '🥟',
    note: '',
  },
  {
    category: 'side',
    name: '泰式炸雞佐羅望子醬（不辣）',
    options: ['220'],
    tags: [],
    image: null,
    emoji: '🍗',
    note: '',
  },
  {
    category: 'side',
    name: '炸豆腐佐手工酸甜醬',
    options: ['95'],
    tags: ['V'],
    image: null,
    emoji: '🧈',
    note: '',
  },
  {
    category: 'side',
    name: '泰式女婿蛋',
    options: ['95'],
    tags: ['V'],
    image: null,
    emoji: '🥚',
    note: '',
  },
  {
    category: 'side',
    name: '豆醬高麗菜',
    options: ['大 180', '小 100'],
    tags: ['V'],
    image: null,
    emoji: '🥬',
    note: '',
  },
  {
    category: 'side',
    name: '蝦醬高麗菜',
    options: ['大 180', '小 100'],
    tags: [],
    image: null,
    emoji: '🥬',
    note: '',
  },
  {
    category: 'side',
    name: '泰式涼拌沙拉',
    options: ['大 170', '小 100'],
    tags: ['V'],
    image: null,
    emoji: '🥗',
    note: '',
  },
  {
    category: 'side',
    name: '泰國茉莉香米',
    options: ['20'],
    tags: ['V'],
    image: null,
    emoji: '🍚',
    note: '一碗',
  },

  // ── 甜點類 ──────────────────────────────────────────────────
  {
    category: 'dessert',
    name: '焦糖糯米炸香蕉',
    options: ['50'],
    tags: ['V'],
    image: null,
    emoji: '🍌',
    note: '一份',
  },
  {
    category: 'dessert',
    name: '椰汁西米露',
    options: ['30'],
    tags: ['V'],
    image: null,
    emoji: '🥥',
    note: '一杯',
  },

  // ── 飲料類 ──────────────────────────────────────────────────
  {
    category: 'drink',
    name: '泰式奶茶',
    options: ['杯 70', '壺 160'],
    tags: [],
    image: null,
    emoji: '🧋',
    note: '',
  },
  {
    category: 'drink',
    name: '山竹汁',
    options: ['杯 70', '壺 160'],
    tags: [],
    image: null,
    emoji: '🧃',
    note: '',
  },
  {
    category: 'drink',
    name: '羅望子汁',
    options: ['杯 70', '壺 160'],
    tags: [],
    image: null,
    emoji: '🧃',
    note: '',
  },
  {
    category: 'drink',
    name: '椰子汁',
    options: ['杯 70', '壺 160'],
    tags: [],
    image: null,
    emoji: '🥥',
    note: '',
  },
  {
    category: 'drink',
    name: '泰國啤酒（聖獅／大象 330ml）',
    options: ['80'],
    tags: [],
    image: null,
    emoji: '🍺',
    note: '瓶裝',
  },
]
