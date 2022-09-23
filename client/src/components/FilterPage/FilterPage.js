import React from 'react'
import styles from '../../asserts/stylesheet/Filter/Filter.module.css'
import Divider from '@mui/material/Divider';

const items = [
  { id: 1, title: "Food & Drink" },
  { id: 2, title: "Business" },
  { id: 3, title: "Music" },
  { id: 4, title: "Film & Media" },
]
const FilterPage = () => {
  return (
    <div className={styles['filter-container']}>
      <div className={styles['filter-left-bar']}>
        <div className={styles['filter-title']}>
          Filters
        </div>
        <Divider />
        <div className={styles['filter-list']}>
          <div className={styles['filter-category']}>
            Category
          </div>
          {
            items.map(item => {
              return (
                <div className={styles['filter-items']} key={item.id}>
                  {item.title}
                </div>
              )
            })
          }

        </div>
      </div>
      <div className={styles['filter-content']}>

      </div>
    </div>
  )
}

export default FilterPage;