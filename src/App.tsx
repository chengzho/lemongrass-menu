import { LanguageContext, useLanguageState } from './hooks/useLanguage'
import { menuItems } from './data/menu-i18n'
import { categoryOrder, categoryNames, siteName, siteSubtitle, diningRules, languageLabels, languages } from './data/site-info'
import type { Language } from './types/menu'

function App() {
  const languageState = useLanguageState()
  const { lang, setLang } = languageState

  const categories = categoryOrder.filter(cat =>
    menuItems.some(item => item.category === cat)
  )

  return (
    <LanguageContext.Provider value={languageState}>
      <div className="min-h-screen bg-[#F9F7F4]">

        {/* Language Switcher */}
        <nav className="sticky top-0 z-30 flex h-11 bg-white border-b border-[#E8E4E0]">
          {languages.map((l: Language) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 text-sm transition-colors ${
                lang === l
                  ? 'font-semibold text-[#C9973A] border-b-2 border-[#C9973A]'
                  : 'text-[#999999] font-normal'
              }`}
            >
              {languageLabels[l]}
            </button>
          ))}
        </nav>

        {/* Header */}
        <header>
          <div
            className="flex flex-col items-center justify-center gap-1 py-6"
            style={{ background: 'linear-gradient(180deg, #D4A845 0%, #9B6228 100%)' }}
          >
            <h1 className="text-[30px] font-bold text-white leading-tight">
              {siteName[lang]}
            </h1>
            <p className="text-[15px] italic text-[#FFE8B0]">{siteSubtitle}</p>
          </div>
          <div className="bg-[#FDF6EB] px-4 py-[10px] text-center">
            <p className="text-xs text-[#8B6B3D]">{diningRules[lang]}</p>
          </div>
        </header>

        {/* Category Nav */}
        <nav className="sticky top-11 z-20 flex h-11 bg-white border-b border-[#E8E4E0]">
          {categories.map(cat => (
            <a
              key={cat}
              href={`#section-${cat}`}
              className="flex-1 flex items-center justify-center text-sm text-[#888888] font-normal"
            >
              {categoryNames[cat]?.[lang] ?? cat}
            </a>
          ))}
        </nav>

        {/* Menu Sections */}
        <main className="pb-8">
          {categories.map(cat => {
            const items = menuItems.filter(item => item.category === cat)
            return (
              <section key={cat} id={`section-${cat}`}>
                <div className="h-[38px] bg-[#F0EDE8] flex items-center px-4">
                  <span className="text-[13px] font-bold text-[#8B6B3D]">
                    {categoryNames[cat]?.[lang] ?? cat}
                  </span>
                </div>
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-3 py-3 bg-white border-b border-[#F0EDE8] min-h-[96px]"
                  >
                    {/* Emoji / Image */}
                    <div className="w-[60px] h-[60px] shrink-0 bg-[#FEF3E4] rounded-[10px] flex items-center justify-center text-[28px]">
                      {item.image
                        ? <img src={`/lemongrass-menu/images/${item.image}`} alt={item.names[lang]} className="w-full h-full object-cover rounded-[10px]" loading="lazy" />
                        : item.emoji
                      }
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                      <p className="text-[14px] font-bold text-[#1A1A1A] leading-snug">
                        {item.names[lang]}
                      </p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[11px] px-[5px] py-[2px] rounded-[3px] bg-[#FEF3E4] text-[#8B6B3D]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-[12px] text-[#C9973A]">
                        {item.price.map((p, i) => (
                          <span key={i}>
                            {i > 0 && ' / '}
                            {p.label ? `${p.label[lang]} ` : ''}
                            {p.value === 'market' ? diningRules[lang] : `NT$${p.value}`}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )
          })}
        </main>
      </div>
    </LanguageContext.Provider>
  )
}

export default App
