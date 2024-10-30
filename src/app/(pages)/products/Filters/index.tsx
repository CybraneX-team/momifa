'use client'

// import React from 'react'

// import { Category } from '../../../../payload/payload-types'
// import { Checkbox } from '../../../_components/Checkbox'
// import { HR } from '../../../_components/HR'
// import { RadioButton } from '../../../_components/Radio'
// import { useFilter } from '../../../_providers/Filter'

// import classes from './index.module.scss'

// const Filters = ({ categories }: { categories: Category[] }) => {
//   const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()

//   const handleCategories = (categoryId: string) => {
//     if (categoryFilters.includes(categoryId)) {
//       const updatedCategories = categoryFilters.filter(id => id !== categoryId)

//       setCategoryFilters(updatedCategories)
//     } else {
//       setCategoryFilters([...categoryFilters, categoryId])
//     }
//   }

//   const handleSort = (value: string) => setSort(value)

//   return (
//     <div className={classes.filters}>
//       <div>
//         <h6 className={classes.title}>Product Categories</h6>
//         <div className={classes.categories}>
//           {categories.map(category => {
//             const isSelected = categoryFilters.includes(category.id)

//             return (
//               <Checkbox
//                 key={category.id}
//                 label={category.title}
//                 value={category.id}
//                 isSelected={isSelected}
//                 onClickHandler={handleCategories}
//               />
//             )
//           })}
//         </div>
//         <HR className={classes.hr} />
//         <h6 className={classes.title}>Sort By</h6>
//         <div className={classes.categories}>
//           <RadioButton
//             label="Latest"
//             value="-createdAt"
//             isSelected={sort === '-createdAt'}
//             onRadioChange={handleSort}
//             groupName="sort"
//           />
//           <RadioButton
//             label="Oldest"
//             value="createdAt"
//             isSelected={sort === 'createdAt'}
//             onRadioChange={handleSort}
//             groupName="sort"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Filters

import { useState } from 'react';
import { Check } from 'lucide-react';

const Filters = () => {
  const [priceRange, setPriceRange] = useState(200);
  const [sizeRange, setSizeRange] = useState(15);
  const [selectedTypes, setSelectedTypes] = useState(['Polo T-Shirts', 'T-shirts']);

  const colors = [
    { color: '#333333', label: 'Black' },
    { color: '#9FDFFF', label: 'Sky Blue' },
    { color: '#d11212', label: 'Cherry Red' },
    { color: '#E39FFF', label: 'Purple' },
    { color: '#FF9F9F', label: 'Coral' },
    { color: '#FFFFFF', label: 'White' },
    { color: '#2e5c32', label: 'Green' },
    { color: '#ff2e4f', label: 'French Pink' }
  ];

  const types = ['Polo T-shirts',  'T-shirts', ];


  const handleTypeSelect = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleSizeChange = (e) => {
    setSizeRange(Number(e.target.value));
  };

  return (
    <div className="w-64 h-fit bg-black p-6 text-white -ml-24 mt-10 pt-16">
      <div className="border-r border-[#8b8b8b] pr-10 -mr-6">
      <div className="mb-8 ">
        <h1 className="text-2xl font-bold mb-4">Polo T-Shirts</h1>
        <h2 className="text-lg mb-4">Filters</h2>
      </div>

     
      <div className="mb-8">
        <h3 className="text-sm mb-4">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((colorObj) => (
            <button
              key={colorObj.color}
              className={`w-8 h-8 rounded-full border-2 border-white`}
              style={{ backgroundColor: colorObj.color }}
              
            />
          ))}
        </div>
      </div>

    
      <div className="mb-8">
        <h3 className="text-sm mb-4">Type</h3>
        <div className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeSelect(type)}
                  />
                   <div className="w-4 h-4 border border-white flex items-center justify-center">
                    {selectedTypes.includes(type) && (
                      <Check size={14} className="text-[#5F96FF]" />
                    )}
                  </div>
                </div>
                <span className="text-sm">{type}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mb-8">
        <h3 className="text-sm mb-4">Price range</h3>
        <div className="relative">
          <input
            type="range"
            min="10"
            max="400"
            value={priceRange}
            onChange={handlePriceChange}
            className="w-full h-0.5 bg-gray-600 rounded-lg appearance-none  cursor-pointer"
          />
          <div className="flex justify-between text-xs mt-2">
            <span>10$</span>
            <span className="bg-gray-700 px-2 py-1 rounded">{priceRange}$</span>
            <span>400$</span>
          </div>
        </div>
      </div>

    
      <div>
        <h3 className="text-sm mb-4">Size</h3>
        <div className="relative">
          <input
            type="range"
            min="10"
            max="120"
            value={sizeRange}
            onChange={handleSizeChange}
            className="w-full h-0.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs mt-2">
            <span>10inch</span>
            <span className="bg-gray-700 px-2 py-1 rounded">{sizeRange}inch</span>
            <span>120inch</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Filters;