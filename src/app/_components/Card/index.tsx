'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { Media } from '../Media'
import { Price } from '../Price'

import classes from './index.module.scss'

const priceFromJSON = (priceJSON): string => {
  let price = '$25'

  if (priceJSON) {
    try {
      console.log('priceJSON:', priceJSON) // Log the raw priceJSON

      const parsed = JSON.parse(priceJSON)?.data[0]
      console.log('Parsed data:', parsed) // Log the parsed data
      const priceValue = parsed.unit_amount
      const priceType = parsed.type
      price = `${parsed.currency === 'usd' ? '$' : ''}${Math.floor(priceValue / 100)}`
      // if (priceType === 'recurring') {
      //   price += `/${
      //     parsed.recurring.interval_count > 1
      //       ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
      //       : parsed.recurring.interval
      //   }`
      // }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories, meta, priceJSON } = {},
    className,
  } = props

  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/products/${slug}`

  const [
    price, // eslint-disable-line no-unused-vars
    setPrice,
  ] = useState(() => priceFromJSON(priceJSON))

  useEffect(() => {
    setPrice(priceFromJSON(priceJSON))
  }, [priceJSON])

  return (
    <Link href={href} className={[classes.card, className].filter(Boolean).join(' ')}>
      <div className={classes.mediaWrapper}>
        <div className={classes.discountWrapper}>
          <div className={classes.discountBadge}>-22%</div>
          <div className={classes.strikethroughPrice}>$40.00</div>
        </div>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <div className={classes.imageContainer}>
            <Media imgClassName={classes.image} resource={metaImage} fill />
            <div className={classes.vignette}>
              <div className={classes.titleRow}>
                <div className={classes.titleOverlay}>
                  <h4 className={classes.title}>{price}</h4>
                </div>

                <div className={classes.titleOverlayP}>
                  <h4 className={classes.title}>{title}</h4>
                </div>

                <div className={classes.titleOverlayG}>
                  <h4 className={classes.title}>
                    <img src="/media/goTo.png" alt="" className=" " />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
