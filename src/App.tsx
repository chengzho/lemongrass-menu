import { useState, useCallback } from 'react';
import { LanguageContext, useLanguageState } from './hooks/useLanguage';
import { menuItems } from './data/menu-i18n';
import { categoryOrder } from './data/site-info';
import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import type { MenuItem } from './types/menu';

function App() {
  const languageState = useLanguageState();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = categoryOrder.filter(cat =>
    menuItems.some(item => item.category === cat)
  );

  const handleCardClick = useCallback((item: MenuItem) => {
    setSelectedItem(item);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

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

        <ItemDetailModal item={selectedItem} onClose={handleModalClose} />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
