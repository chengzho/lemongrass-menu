import { LanguageContext, useLanguageState } from './hooks/useLanguage';
import { menuItems } from './data/menu-i18n';
import { categoryOrder } from './data/site-info';
import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import type { MenuItem } from './types/menu';

function App() {
  const languageState = useLanguageState();

  const categories = categoryOrder.filter(cat =>
    menuItems.some(item => item.category === cat)
  );

  // Phase 3 將在此接上 ItemDetailModal
  const handleCardClick = (_item: MenuItem) => {
    // TODO: open modal
  };

  return (
    <LanguageContext.Provider value={languageState}>
      <div className="min-h-screen bg-[#F9F7F4]">
        <LanguageSwitcher />
        <Header />
        <CategoryNav categories={categories} />
        <main className="pb-10">
          {categories.map(cat => (
            <MenuSection
              key={cat}
              category={cat}
              items={menuItems.filter(item => item.category === cat)}
              onCardClick={handleCardClick}
            />
          ))}
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
