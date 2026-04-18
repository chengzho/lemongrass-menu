import type { I18nString, Language } from '../types/menu';

export const siteName = {
  zh: '香茅廚房',
  en: 'Lemongrass Kitchen',
  ja: 'レモングラスキッチン',
  ko: '레몬그라스 키친',
} satisfies I18nString;

export const siteSubtitle = 'Lemongrass Kitchen';

export const diningRules = {
  zh: '用餐時間限 90 分鐘 · 每人最低消費 NT$300',
  en: '90-min dining limit · NT$300 minimum per person',
  ja: 'お食事時間 90 分以内・お一人様 NT$300 より',
  ko: '식사 시간 90분 제한 · 1인 최소 주문 NT$300',
} satisfies I18nString;

export const categoryNames: Record<string, I18nString> = {
  main:    { zh: '主餐類', en: 'Mains',    ja: 'メインディッシュ', ko: '메인요리' },
  side:    { zh: '單點類', en: 'Sides',    ja: 'サイドメニュー',  ko: '사이드메뉴' },
  dessert: { zh: '甜點類', en: 'Desserts', ja: 'デザート',       ko: '디저트' },
  drink:   { zh: '飲料類', en: 'Drinks',   ja: 'ドリンク',       ko: '음료' },
};

export const categoryOrder: string[] = ['main', 'side', 'dessert', 'drink'];

export const marketPrice = {
  zh: '時價',
  en: 'Market Price',
  ja: '時価',
  ko: '시가',
} satisfies I18nString;

export const languageLabels: Record<Language, string> = {
  zh: '中文',
  en: 'EN',
  ja: '日本語',
  ko: '한국어',
};

export const languages: Language[] = ['zh', 'en', 'ja', 'ko'];

export const modalLabels = {
  close:  { zh: '關閉', en: 'Close', ja: '閉じる',  ko: '닫기' },
  desc:   { zh: '說明', en: 'Description', ja: '説明', ko: '설명' },
  note:   { zh: '備註', en: 'Note',  ja: '備考',    ko: '비고' },
} satisfies Record<string, I18nString>;
