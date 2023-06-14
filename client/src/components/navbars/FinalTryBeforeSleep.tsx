import React, { useState } from 'react';
import classNames from 'classnames';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Категория 1',
      subcategories: [
        'Подкатегория 1.1',
        'Подкатегория 1.2',
        'Подкатегория 1.3'
      ]
    },
    {
      id: 2,
      name: 'Категория 2',
      subcategories: [
        'Подкатегория 2.1',
        'Подкатегория 2.2',
        'Подкатегория 2.3'
      ]
    },
    {
      id: 3,
      name: 'Категория 3',
      subcategories: [
        'Подкатегория 3.1',
        'Подкатегория 3.2',
        'Подкатегория 3.3'
      ]
    }
  ];

  const handleMenuEnter = () => {
    setActiveCategory(null);
  };

  const handleCategoryEnter = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="menu" onMouseEnter={handleMenuEnter}>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={classNames('category', { 'active': category.id === activeCategory })}
            onMouseEnter={() => handleCategoryEnter(category.id)}
          >
            <a href="#">{category.name}</a>
            {category.id === activeCategory && (
              <ul className="subcategories">
                {category.subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <a href="#">{subcategory}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;