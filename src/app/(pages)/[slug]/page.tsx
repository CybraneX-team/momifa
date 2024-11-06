import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Category, Page } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import { generateMeta } from '../../_utilities/generateMeta'

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic'

import { CollectionArchive } from '../../_components/CollectionArchive'
import ProductShowCase from '../../_components/ProductShowCase'
import Categories from '../../_components/Categories'
import HorizontalScroll from '../../_components/ScrollCards'
import Promotion from '../../_components/Promotion'
import IconScoll from '../../_components/IconScroll'

import classes from './index.module.scss'
// import './bg.scss'
import dynamicM from 'next/dynamic'
import Feedback from '../../_components/Feedbacks'
import FAQ from '../../_components/FAQ'
import ProductsOnHome from '../../_components/ProductsOnHome'
import Head from 'next/head'
import Hoodies from '../../_components/Hoodies'

const FallingRectangles = dynamicM(() => import('../../_components/Fall'), {
  ssr: false,

  loading: () => <div style={{ height: '300px' }}>Loading...</div>,
})

const cardData = [
  {
    title: 'Auto-generate personalized videos in bulk',
    subtitle: 'Video prospecting tool to personalize videos with your own face & voice',
    image: '/path/to/image1.jpg',
  },
  {
    title: 'Increase reply rates to cold emails by 150%+',
    subtitle: 'Create outreach campaigns that truly stand out',
    image: '/path/to/image2.jpg',
  },
  {
    title: 'Improve scheduling by 80%',
    subtitle: 'Effectively engage with qualified prospects',
    image: '/path/to/image3.jpg',
  },
  // Add more cards as needed
]

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = staticHome
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <React.Fragment>
      {slug === 'home' ? (
        <>
        <Head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
       </Head>
        <section>
          <Hero {...hero} />

          {/* <IconScoll /> */}
          <div className={classes.fallingRectanglesWrapper}>
            <FallingRectangles />
          </div>
          <Gutter className={classes.home}>
            <Categories categories={categories} />
            {/* <Promotion /> */}
          </Gutter>
          <div className={classes.horizontalScrollWrapper}>
            <HorizontalScroll />
          </div>
          <div className="">
            <ProductShowCase />
          </div>
<div className={classes.hoodies}>
          <Hoodies />
          </div>
          <ProductsOnHome />
          <Feedback />
          <div className={classes.faq}>
            <FAQ />
          </div>
        </section>
        </>
      ) : (
        <>
        <Head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0,  user-scalable=no" />
        </Head>
          <Hero {...hero} />
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
        </>
      )}
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page && slug === 'home') {
    page = staticHome
  }

  return generateMeta({ doc: page })
}
