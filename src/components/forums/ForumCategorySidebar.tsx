
import React from "react";

export interface ForumCategory {
  id: string;
  name: string;
}

interface ForumCategorySidebarProps {
  categories: ForumCategory[];
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

const ForumCategorySidebar: React.FC<ForumCategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  if (categories.length === 0) return null;

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 py-6 pr-2 shrink-0">
      <nav>
        <h2 className="px-4 mb-4 text-sm text-gray-500 font-bold uppercase">
          Categories
        </h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`w-full text-left py-2 px-4 rounded-md mb-1 transition 
                  ${selectedCategory === cat.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                  }`}
                onClick={() => onSelectCategory(cat.id)}
                aria-current={selectedCategory === cat.id ? "page" : undefined}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ForumCategorySidebar;
