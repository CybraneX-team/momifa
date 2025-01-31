'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { Category, Product } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'
import { Checkbox } from '../../../_components/Checkbox'
import { fetchDocs } from '../../../_api/fetchDocs'
import styles from './index.module.scss'
const Filters = ({
  categories,
  productColors,
}: {
  categories: Category[]
  productColors: Product[]
}) => {
  const [priceRange, setPriceRange] = useState(200)
  const [sizeRange, setSizeRange] = useState(15)
  const [allColors, setallColors] = useState(productColors)
  const [isSelected, setisSelected] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState(categories)
  const [selectedColorMap, setSelectedColorMap] = useState<{ [key: string]: boolean }>({})
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  const colorButtonRef = useRef(null)
  const [forceUpdate, setForceUpdate] = useState(0) // Add this for forcing re-render

  useEffect(() => {
    if (categoryFilters.length === 0) {
      setallColors(productColors)
    }
  }, [categoryFilters])

  useEffect(() => {
    const initialColorMap = {}
    allColors.forEach(color => {
      initialColorMap[color.id] = false
    })
    setSelectedColorMap(initialColorMap)
  }, [allColors])

  const handleColorClick = colorObj => {
    handleCategoriesColor(colorObj.id, colorObj.color)
    setSelectedColorMap(prevMap => ({
      ...prevMap,
      [colorObj.id]: !prevMap[colorObj.id],
    }))
    setForceUpdate(prev => prev + 1)
  }
  const handleCategories = (categoryId: string) => {
    const newCategory = categoryFilters.filter(e => typeof e !== 'object')
    setCategoryFilters(newCategory)

    const isCategorySelected = categoryFilters.some(filter =>
      typeof filter === 'string' ? filter === categoryId : filter.categoryId === categoryId,
    )

    if (isCategorySelected) {
      const updatedCategories = categoryFilters.filter(filter =>
        typeof filter === 'string' ? filter !== categoryId : filter.categoryId !== categoryId,
      )
      setCategoryFilters(updatedCategories)

      if (updatedCategories.length === 0) {
        setallColors(productColors)
      }
    } else {
      setCategoryFilters([...categoryFilters, categoryId])

      setallColors(
        productColors.filter(
          product =>
            product.categories && product.categories.some(category => category.id === categoryId),
        ),
      )
    }
  }

  const handleCategoriesColor = (categoryId: string, colorName: string) => {
    let updatedFilters = [...categoryFilters]
    if (typeof updatedFilters[0] === 'string') {
      updatedFilters = updatedFilters.slice(1)
    }

    const exists = updatedFilters.some(e => e.categoryId === categoryId)

    if (exists) {
      const filteredCategories = updatedFilters.filter(e => e.categoryId !== categoryId)
      setCategoryFilters(filteredCategories)
    } else {
      setCategoryFilters([...updatedFilters, { categoryId, colorName }])
    }
  }

  const handleTypeSelect = type => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handlePriceChange = e => {
    setPriceRange(Number(e.target.value))
  }

  const handleSizeChange = e => {
    setSizeRange(Number(e.target.value))
  }

  return (
    <div className="w-full h-fit p-5 mx-2 mt-14 mb-0 md:w-[50vw] md:mt-20 md:mb-0 md:-ml-20 lg:mx-0 lg:w-[19vw] lg:mr-[-5vw] rounded-lg bg-[#5857574d]">
      <div className=" pr-10 -mr-6">
        <div className="mb-5">
          <h2 className="text-lg mb-4">Filters</h2>
        </div>
        <div className="mb-8">
          <h3 className="text-sm mb-4">Colors</h3>
          <div className="grid grid-cols-4 gap-2">
            {allColors.map(colorObj => {
              const isColorSelected = selectedColorMap[colorObj.id]
              return (
                <button
                  key={colorObj.id}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    isColorSelected
                      ? `${styles.selected} ${styles.selectedd}`
                      : 'border-2 border-white'
                  }`}
                  style={{
                    backgroundColor: colorObj.color,
                  }}
                  onClick={() => handleColorClick(colorObj)}
                />
              )
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm mb-4">Type</h3>
          <div className="space-y-3">
            {categories.map(type => (
              <div key={type.id} className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div>
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
            ))}
          </div>
        </div>

        {/* <div className="mb-8">
          <h3 className="text-sm mb-4">Price range</h3>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="400"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full h-0.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
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
        </div> */}
      </div>
    </div>
  )
}

export default Filters
