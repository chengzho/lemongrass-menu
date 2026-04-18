import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { TagBadge } from './TagBadge';
import { marketPrice, modalLabels } from '../data/site-info';
import type { MenuItem } from '../types/menu';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

function dist(a: Touch, b: Touch): number {
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

export function ItemDetailModal({ item, onClose }: Props) {
  const { lang } = useLanguage();

  // ── 捲動鎖定 ──────────────────────────────────────────────
  // 使用 position:fixed 技巧確保 iOS Safari 也能正確鎖定與還原
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (!item) return;

    savedScrollY.current = window.scrollY;
    const y = savedScrollY.current;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, y);
    };
  }, [item]);

  // ── Escape 關閉 ────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // ── Pinch-to-zoom ─────────────────────────────────────────
  // 直接操作 DOM 避免每個 touchmove 都觸發 React re-render
  const mediaAreaRef = useRef<HTMLDivElement>(null);
  const mediaElRef   = useRef<HTMLElement | null>(null);
  const scaleRef     = useRef(1);
  const lastDistRef  = useRef(0);

  const resetZoom = useCallback(() => {
    scaleRef.current = 1;
    if (mediaElRef.current) {
      mediaElRef.current.style.transform = 'scale(1)';
      mediaElRef.current.style.transition = 'transform 0.25s ease';
    }
  }, []);

  // item 切換時重設縮放
  useEffect(() => { resetZoom(); }, [item, resetZoom]);

  useEffect(() => {
    const area = mediaAreaRef.current;
    if (!area) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        lastDistRef.current = dist(e.touches[0], e.touches[1]);
        if (mediaElRef.current) {
          mediaElRef.current.style.transition = 'none';
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || lastDistRef.current === 0) return;
      e.preventDefault(); // 阻止瀏覽器原生縮放，需要 passive:false
      const d = dist(e.touches[0], e.touches[1]);
      scaleRef.current = Math.min(3, Math.max(1, scaleRef.current * (d / lastDistRef.current)));
      lastDistRef.current = d;
      if (mediaElRef.current) {
        mediaElRef.current.style.transform = `scale(${scaleRef.current})`;
      }
    };

    const onTouchEnd = () => { lastDistRef.current = 0; };

    area.addEventListener('touchstart', onTouchStart, { passive: true });
    area.addEventListener('touchmove',  onTouchMove,  { passive: false });
    area.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      area.removeEventListener('touchstart', onTouchStart);
      area.removeEventListener('touchmove',  onTouchMove);
      area.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  if (!item) return null;

  // ── 格式化輔助 ─────────────────────────────────────────────
  const isSinglePrice = item.price.length === 1 && item.price[0].label === null;

  const hasDesc = item.desc[lang].trim() !== '';
  const hasNote = item.note[lang].trim() !== '';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet：固定在視窗底部，置中於 480px 容器 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.names[lang]}
        className="fixed bottom-0 z-50 w-full max-w-[480px] left-1/2 -translate-x-1/2
                   bg-white rounded-t-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: '90dvh' }}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          aria-label={modalLabels.close[lang]}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center
                     rounded-full bg-black/25 text-white text-[20px] leading-none"
        >
          ×
        </button>

        {/* 圖片 / Emoji 區域（固定高度，不參與捲動）*/}
        <div
          ref={mediaAreaRef}
          className="w-full shrink-0 bg-[#FEF3E4] flex items-center justify-center overflow-hidden"
          style={{ height: '220px', cursor: 'default', touchAction: 'none' }}
          onDoubleClick={resetZoom}
        >
          {item.image ? (
            <img
              ref={el => { mediaElRef.current = el; }}
              src={`/lemongrass-menu/images/${item.image}`}
              alt={item.names[lang]}
              className="w-full h-full object-cover origin-center will-change-transform"
              loading="eager"
            />
          ) : (
            <span
              ref={el => { mediaElRef.current = el; }}
              role="img"
              aria-label={item.names[lang]}
              className="select-none origin-center will-change-transform"
              style={{ fontSize: '80px', lineHeight: 1 }}
            >
              {item.emoji}
            </span>
          )}
        </div>

        {/* 可捲動內容 */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-10">

          {/* 品項名稱 */}
          <h2 className="text-[18px] font-bold text-[#1A1A1A] leading-snug mb-2">
            {item.names[lang]}
          </h2>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-[6px] mb-3">
              {item.tags.map(code => <TagBadge key={code} code={code} />)}
            </div>
          )}

          {/* 分隔線 */}
          <div className="border-t border-[#F0EDE8] my-3" />

          {/* 價格 */}
          {isSinglePrice ? (
            <p className="text-[20px] font-bold text-[#C9973A]">
              {item.price[0].value === 'market'
                ? marketPrice[lang]
                : `NT$${item.price[0].value}`}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {item.price.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  {p.label && (
                    <span className="text-[14px] text-[#8B6B3D]">{p.label[lang]}</span>
                  )}
                  <span className="text-[15px] font-semibold text-[#C9973A] ml-auto">
                    {p.value === 'market' ? marketPrice[lang] : `NT$${p.value}`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 說明（desc）*/}
          {hasDesc && (
            <>
              <div className="border-t border-[#F0EDE8] my-3" />
              <p className="text-[11px] font-semibold text-[#8B6B3D] uppercase tracking-wide mb-1">
                {modalLabels.desc[lang]}
              </p>
              <p className="text-[13px] text-[#555555] leading-relaxed">{item.desc[lang]}</p>
            </>
          )}

          {/* 備註（note）*/}
          {hasNote && (
            <>
              <div className="border-t border-[#F0EDE8] my-3" />
              <p className="text-[11px] font-semibold text-[#8B6B3D] uppercase tracking-wide mb-1">
                {modalLabels.note[lang]}
              </p>
              <p className="text-[13px] text-[#777777] leading-relaxed">{item.note[lang]}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
