export type Language = 'zh' | 'en' | 'ja' | 'ko';

export interface I18nString {
  zh: string;
  en: string;
  ja: string;
  ko: string;
}

export interface PriceOption {
  label: I18nString | null;
  value: number | 'market';
}

export type Category = 'main' | 'side' | 'dessert' | 'drink';

export interface MenuItem {
  id: string;
  category: Category;
  names: I18nString;
  price: PriceOption[];
  image: string | null;
  emoji: string;
  tags: string[];
  desc: I18nString;
  note: I18nString;
}

export interface TagDefinition {
  icon: string;
  label: I18nString;
  variant: 'default' | 'vegetarian' | 'spicy';
}
