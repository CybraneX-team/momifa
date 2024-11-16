'use client'


import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Category, Product } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter';
import { Checkbox } from '../../../_components/Checkbox'
import { fetchDocs } from '../../../_api/fetchDocs';

const Filters =   ({ categories, productColors }: { categories: Category[], productColors : Product[] }) => {
  const [priceRange, setPriceRange] = useState(200);
  const [sizeRange, setSizeRange] = useState(15);
  const [allColors, setallColors] = useState(productColors);
  const [isSelected, setisSelected] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(categories);
  // const [selectedColor, setSelectedColor] = useState<[] | null>(null);
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  const colorButtonRef = useRef(null)
  
  // console.log("productColors",productColors)
  useEffect(() => {
    if(categoryFilters.length === 0){
      setallColors(productColors)
    }
  }, [categoryFilters]);
  
  const handleColorClick = (colorObj) => {
    handleCategoriesColor(colorObj.id, colorObj.color);  
  };
  const handleCategories = (categoryId: string) => {
    
    setallColors(productColors.filter((e) => e.categories[0].id === categoryId));
    if(categoryFilters.length){
      setCategoryFilters([])
    }
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter((id) => id !== categoryId);
      setCategoryFilters(updatedCategories);
    } else {
      setCategoryFilters([...categoryFilters, categoryId]);
    }
  };
  
  
  const handleCategoriesColor = (categoryId: string, colorName: string) => {
    // Remove the first element if it is a string
    let updatedFilters = [...categoryFilters];
    if (typeof updatedFilters[0] === "string") {
      updatedFilters = updatedFilters.slice(1);
    }
  
    // Check if the category already exists
    const exists = updatedFilters.some(e => e.categoryId === categoryId);
  
    if (exists) {
      // Remove the existing category
      const filteredCategories = updatedFilters.filter(e => e.categoryId !== categoryId);
      setCategoryFilters(filteredCategories);
    } else {
      // Add the new category
      setCategoryFilters([...updatedFilters, { categoryId, colorName }]);
    }
  };
  
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
        {/* <h1 className="text-2xl font-bold mb-4">Polo T-Shirts</h1> */}
        <h2 className="text-lg mb-4">Filters</h2>
      </div>
      <div className="mb-8">
        <h3 className="text-sm mb-4">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {allColors.map((colorObj) => (
            <button
              key={colorObj.color}
              className={`w-8 h-8 rounded-full border-2 border-white`}
              style={{ backgroundColor: colorObj.color }}
              ref={colorButtonRef}
              onClick={
                ()=>{
                  {
                    handleColorClick(colorObj)
                  }
                }
              }              
            />
          ))}
        </div>
      </div>

    
  <div className="mb-8">
  <h3 className="text-sm mb-4">Type</h3>
  <div className="space-y-3">
    {categories.map((type) => {
      return (
        <div key={type.id} className="flex items-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div >
              <Checkbox
                key={type.id}
                label={type.title}
                value={type.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            </div>
          </label>
        </div>
      );
    })}
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