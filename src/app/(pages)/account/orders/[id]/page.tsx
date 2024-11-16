import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../../payload/payload-types'
import { HR } from '../../../../_components/HR'
import { Media } from '../../../../_components/Media'
import { Price } from '../../../../_components/Price'
import { formatDateTime } from '../../../../_utilities/formatDateTime'
import { getMeUser } from '../../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order: Order | null = null
  let trackingInfo = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })

    if (order?.trackingNumber) {
      trackingInfo = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracking/${order.trackingNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      ).then(res => res.json())
    }
  } catch (error) {
    console.error(error)
  }

  if (!order) {
    notFound()
  }

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#181818] rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6">
            Order Details
            <span className="text-[#D1D1D1] ml-2">#{order.id}</span>
          </h1>

          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 text-[#D1D1D1]">
              <div>
                <p className="text-sm">Order Date</p>
                <p className="font-medium">{formatDateTime(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm">Total Amount</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'usd',
                  }).format(order.total / 100)}
                </p>
              </div>
              {order.trackingNumber && (
                <div className="col-span-2">
                  <p className="text-sm">Tracking Number</p>
                  <p className="font-medium">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>

          {order.trackingNumber && (
            <div className="mb-8">
              <div className="bg-[#202020] rounded-lg p-6">
                <h3 className="text-lg font-medium mb-6">Shipping Status</h3>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className={`w-4 h-4 rounded-full mb-2 ${
                        order.status !== 'pending' ? 'bg-green-500' : 'bg-[#404040]'
                      }`}></div>
                      <div className="text-sm text-[#D1D1D1]">Pickup</div>
                      {trackingInfo?.pickupDate && (
                        <div className="text-xs text-[#909090] mt-1">
                          {formatDateTime(trackingInfo.pickupDate)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className={`w-4 h-4 rounded-full mb-2 ${
                        order.status === 'shipped' ? 'bg-green-500' : 'bg-[#404040]'
                      }`}></div>
                      <div className="text-sm text-[#D1D1D1]">In Transit</div>
                      {trackingInfo?.inTransitDate && (
                        <div className="text-xs text-[#909090] mt-1">
                          {formatDateTime(trackingInfo.inTransitDate)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className={`w-4 h-4 rounded-full mb-2 ${
                        order.status === 'delivered' ? 'bg-green-500' : 'bg-[#404040]'
                      }`}></div>
                      <div className="text-sm text-[#D1D1D1]">Delivered</div>
                      {trackingInfo?.deliveryDate && (
                        <div className="text-xs text-[#909090] mt-1">
                          {formatDateTime(trackingInfo.deliveryDate)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-2 left-0 right-0 h-0.5 bg-[#404040] -z-10">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{
                        width: order.status === 'delivered' ? '100%' : 
                               order.status === 'shipped' ? '66%' :
                               order.status !== 'pending' ? '33%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>

                {trackingInfo && (
                  <div className="mt-6 p-4 bg-[#181818] rounded">
                    <h4 className="text-md font-medium mb-2">Latest Update</h4>
                    <p className="text-sm text-[#D1D1D1]">{trackingInfo.currentStatus}</p>
                    <p className="text-xs text-[#909090] mt-1">{trackingInfo.location}</p>
                    <p className="text-xs text-[#909090]">{formatDateTime(trackingInfo.timestamp)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Order Items</h3>
            {order.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { id, title, meta, stripeProductID },
                } = item

                const metaImage = meta?.image

                return (
                  <div key={index} className="border border-[#404040] rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Link href={`/products/${product.slug}`}>
                          {!metaImage && (
                            <div className="w-full h-full bg-[#202020] rounded flex items-center justify-center">
                              <span className="text-sm text-[#909090]">No image</span>
                            </div>
                          )}
                          {metaImage && typeof metaImage !== 'string' && (
                            <Media
                              resource={metaImage}
                              fill
                              className="rounded object-cover"
                            />
                          )}
                        </Link>
                      </div>

                      <div className="flex-grow">
                        <Link href={`/products/${product.slug}`}>
                          <h4 className="font-medium hover:text-[#D1D1D1]">{title}</h4>
                        </Link>
                        <div className="text-sm text-[#D1D1D1] mt-1">Quantity: {quantity}</div>
                        <Price 
                          product={product}
                          button={false}
                          quantity={quantity}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}