import { useLanguage } from '../hooks/useLanguage';
import { TagBadge } from './TagBadge';
import { marketPrice } from '../data/site-info';
import type { MenuItem } from '../types/menu';

interface Props {
  item: MenuItem;
  onClick: () => void;
}

function formatPrice(item: MenuItem, lang: 'zh' | 'en' | 'ja' | 'ko'): string {
  return item.price
    .map(p => {
      const val = p.value === 'market' ? marketPrice[lang] : `NT$${p.value}`;
      return p.label ? `${p.label[lang]} ${val}` : val;
    })
    .join(' / ');
}

export function MenuCard({ item, onClick }: Props) {
  const { lang } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 bg-white border-b border-[#F0EDE8] min-h-[96px] text-left active:bg-[#FAFAFA] transition-colors"
    >
      {/* Emoji / Image */}
      <div className="w-[60px] h-[60px] shrink-0 bg-[#FEF3E4] rounded-[10px] flex items-center justify-center text-[28px] overflow-hidden">
        {item.image ? (
          <img
            src={`/lemongrass-menu/images/${item.image}`}
            alt={item.names[lang]}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span role="img" aria-label={item.names[lang]}>{item.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
        <p className="text-[14px] font-bold text-[#1A1A1A] leading-snug">
          {item.names[lang]}
        </p>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map(code => <TagBadge key={code} code={code} />)}
          </div>
        )}

        <p className="text-[12px] text-[#C9973A]">
          {formatPrice(item, lang)}
        </p>

        {item.note[lang] && (
          <p className="text-[11px] text-[#999999]">{item.note[lang]}</p>
        )}
      </div>
    </button>
  );
}
