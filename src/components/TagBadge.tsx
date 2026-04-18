import { tags } from '../data/tags';
import { useLanguage } from '../hooks/useLanguage';

interface Props {
  code: string;
}

export function TagBadge({ code }: Props) {
  const { lang } = useLanguage();
  const tag = tags[code];
  if (!tag) return null;

  const cls = {
    default:    'bg-[#FEF3E4] text-[#8B6B3D]',
    vegetarian: 'bg-[#E8F5E8] text-[#4A7C4A]',
    spicy:      'bg-[#FFF0E6] text-[#C0552A]',
  }[tag.variant];

  return (
    <span className={`inline-flex items-center gap-[2px] text-[11px] leading-none px-[5px] py-[2px] rounded-[3px] ${cls}`}>
      <span aria-hidden="true">{tag.icon}</span>
      <span>{tag.label[lang]}</span>
    </span>
  );
}
