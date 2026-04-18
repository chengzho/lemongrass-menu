import { useLanguage } from '../hooks/useLanguage';
import { siteName, diningRules } from '../data/site-info';

export function Header() {
  const { lang } = useLanguage();

  return (
    <header>
      <div
        className="flex flex-col items-center justify-center gap-1 h-[90px]"
        style={{ background: 'linear-gradient(180deg, #D4A845 0%, #9B6228 100%)' }}
      >
        <h1 className="text-[30px] font-bold text-white leading-tight tracking-wide">
          {siteName[lang]}
        </h1>
        <p className="text-[15px] italic text-[#FFE8B0] font-normal">
          Lemongrass Kitchen
        </p>
      </div>
      <div className="bg-[#FDF6EB] px-4 py-[10px] text-center">
        <p className="text-[12px] text-[#8B6B3D]">{diningRules[lang]}</p>
      </div>
    </header>
  );
}
