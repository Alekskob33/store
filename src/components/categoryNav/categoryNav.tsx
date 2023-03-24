import s from './categoryNav.module.sass';

interface CategoryNavProps {
  names: string[];
  currentName: string;
  onNavClick: (name: string) => void;
}

export default function CategoryNav({ names, currentName, onNavClick }: CategoryNavProps) {
  return (
    <nav className={s.nav}>
      {names.map((categoryName, index) => {
        return (
          <button
            key={index}
            className={categoryName === currentName ? s.btn_active : ''}
            onClick={() => {
              const name = categoryName === currentName ? 'all' : categoryName;
              onNavClick(name);
            }}
          >
            {categoryName}
          </button>
        );
      })}
    </nav>
  );
}
