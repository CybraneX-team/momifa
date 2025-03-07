'use client'

import React from 'react'
import NextImage, { StaticImageData } from 'next/image'

import cssVariables from '../../../cssVariables'
import { Props as MediaProps } from '../types'
import classes from './index.module.scss'
const { breakpoints } = cssVariables

export const Image: React.FC<MediaProps> = props => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource !== 'string') {
    const {
      width: fullWidth,
      height: fullHeight,
      filename: fullFilename,
      alt: altFromResource,
    } = resource

    width = fullWidth
    height = fullHeight
    alt = altFromResource

    const filename = fullFilename
   
    src = filename
  }
  function getSrc(src) {
    if (src.includes("https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/")) {
      return src.replace("https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/", "");
    }
    if (src.includes("https://momifa-storage-bucket.s3.amazonaws.com/")) {
      return src.replace("https://momifa-storage-bucket.s3.amazonaws.com/", "");
    }
    return src;
  }
  
  
  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')
  return (
    <NextImage
      className={[isLoading && classes.placeholder, classes.image, imgClassName]
        .filter(Boolean)
        .join(' ')}
      src={`https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/${getSrc(src)}`}
      alt={alt || ''}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
    />
  )
}
