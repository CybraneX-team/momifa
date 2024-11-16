import React, { ChangeEvent, useEffect, useState } from 'react'

import classes from './index.module.scss'
import { useFilter } from '../../_providers/Filter'

interface CheckboxProps {
  label: string
  value: string
  isSelected: boolean
  onClickHandler: (value: string) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, isSelected, onClickHandler }) => {
  const [isChecked, setIsChecked] = useState(isSelected)
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  useEffect(() => {
    if(categoryFilters.length === 0){
      setIsChecked(false)
    }
  }, [categoryFilters])
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(categoryFilters.length){
      setCategoryFilters([])
    }
    setIsChecked(e.target.checked)
    onClickHandler(value)
  }

  return (
    <label className={classes.checkboxWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={classes.checkbox}
      />
      {label}
    </label>
  )
}
