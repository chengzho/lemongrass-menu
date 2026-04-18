import { useLanguage } from '../hooks/useLanguage';
import { MenuCard } from './MenuCard';
import { categoryNames } from '../data/site-info';
import type { MenuItem } from '../types/menu';

interface Props {
  category: string;
  items: MenuItem[];
  onCardClick: (item: MenuItem) => void;
}

export function MenuSection({ category, items, onCardClick }: Props) {
  const { lang } = useLanguage();

  return (
    <section id={`section-${category}`}>
      <div className="h-[38px] bg-[#F0EDE8] flex items-center px-4">
        <h2 className="text-[13px] font-bold text-[#8B6B3D]">
          {categoryNames[category]?.[lang] ?? category}
        </h2>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <MenuCard item={item} onClick={() => onCardClick(item)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
