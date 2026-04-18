import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { categoryNames } from '../data/site-info';

interface Props {
  categories: string[];
}

// 兩層 sticky bar 的總高度：語言列 44px + 分類列 44px
const STICKY_OFFSET = 88;

export function CategoryNav({ categories }: Props) {
  const { lang } = useLanguage();
  const [active, setActive] = useState<string>(categories[0] ?? '');

  const detectActive = useCallback(() => {
    // 找到最後一個頂部在 sticky offset 以上的分類
    let current = categories[0] ?? '';
    for (const cat of categories) {
      const el = document.getElementById(`section-${cat}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= STICKY_OFFSET + 1) {
        current = cat;
      }
    }
    setActive(current);
  }, [categories]);

  useEffect(() => {
    detectActive();
    window.addEventListener('scroll', detectActive, { passive: true });
    return () => window.removeEventListener('scroll', detectActive);
  }, [detectActive]);

  const scrollToSection = (cat: string) => {
    const el = document.getElementById(`section-${cat}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    // 立刻更新 active，避免等捲動完才更新
    setActive(cat);
  };

  return (
    <nav className="sticky top-11 z-20 flex h-11 bg-white border-b border-[#E8E4E0]">
      {categories.map(cat => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => scrollToSection(cat)}
            className={`flex-1 flex items-center justify-center text-[14px] transition-colors ${
              isActive
                ? 'font-bold text-[#C9973A] border-b-[3px] border-[#C9973A] bg-white'
                : 'font-normal text-[#888888]'
            }`}
          >
            {categoryNames[cat]?.[lang] ?? cat}
          </button>
        );
      })}
    </nav>
  );
}
