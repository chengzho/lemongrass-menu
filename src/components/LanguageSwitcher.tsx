import { useLanguage } from '../hooks/useLanguage';
import { languages, languageLabels } from '../data/site-info';
import type { Language } from '../types/menu';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="sticky top-0 z-30 flex h-11 bg-white border-b border-[#E8E4E0]">
      {languages.map((l: Language) => {
        const active = lang === l;
        // 設計稿：中文/EN 為 14px，日本語/한국어 為 13px
        const fontSize = l === 'zh' || l === 'en' ? '14px' : '13px';
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{ fontSize }}
            className={`flex-1 flex items-center justify-center transition-colors ${
              active
                ? 'font-semibold text-[#C9973A] border-b-2 border-[#C9973A]'
                : 'font-normal text-[#999999]'
            }`}
          >
            {languageLabels[l]}
          </button>
        );
      })}
    </div>
  );
}
