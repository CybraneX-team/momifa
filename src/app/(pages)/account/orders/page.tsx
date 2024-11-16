import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function Orders() {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view your orders.',
    )}&redirect=${encodeURIComponent('/orders')}`,
  })

  let orders: Order[] | null = null

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async res => {
        if (!res.ok) notFound()
        const json = await res.json()
        if ('error' in json && json.error) notFound()
        if ('errors' in json && json.errors) notFound()
        return json
      })
      ?.then(json => {
        console.log('All Orders Data:', JSON.stringify(json.docs, null, 2))
        json.docs.forEach(order => {
          console.log(`Order ID: ${order.id}`)
          console.log(`Shipping Data:`, order.shipping)
          console.log(`Tracking Number: ${order.shipping?.trackingNumber}`)
          console.log(`Order Status: ${order.shipping?.orderStatus || order.status}`)
          console.log('------------------------')
        })
        return json.docs
      })
  } catch (error) {
    console.error('Error fetching orders:', error)
  }

  const activeOrders = orders?.filter(order => 
    order.shipping?.orderStatus !== 'delivered' && order.status !== 'delivered'
  ) || []
  
  const pastOrders = orders?.filter(order => 
    order.shipping?.orderStatus === 'delivered' || order.status === 'delivered'
  ) || []

  return (
    <div>
      <h2 className="text-2xl font-medium mt-12">Active Orders</h2>
      {activeOrders.map(order => {
        const firstItem = Array.isArray(order.items) && order.items[0]?.product
        console.log('Rendering active order:', {
          orderId: order.id,
          trackingNumber: order.shipping?.trackingNumber,
          status: order.shipping?.orderStatus || order.status
        })
        
        return (
          <Link href={`/account/orders/${order.id}`} key={order.id}>
            <div className="bg-[#181818] border border-[#404040] p-5 mt-5 w-full md:w-2/3 rounded-lg flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-[#D1D1D1] text-lg">
                  {typeof firstItem === 'object' ? firstItem.title : 'Order Item'}
                  <span className="text-[#D1D1D1] text-lg mx-3">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(order.total / 100)}
                  </span>
                </p>
                <p className="text-[#D1D1D1] text-lg pt-10">
                  Order ID
                  <span className="text-white block">{order.id}</span>
                </p>
                {order.shipping?.trackingNumber && (
                  <p className="text-[#D1D1D1] text-sm pt-2">
                    Tracking #: {order.shipping.trackingNumber}
                  </p>
                )}
                {order.shipping?.estimatedDelivery && (
                  <p className="text-[#D1D1D1] text-sm pt-2">
                    Estimated Delivery: {formatDateTime(order.shipping.estimatedDelivery)}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center">
                  <p className="text-[#D1D1D1] text-sm mr-2">Pickup</p>
                  <div className={`w-1 h-2 ${
                    order.shipping?.orderStatus === 'processing' || order.shipping?.orderStatus === 'shipped' ? 
                    'bg-green-500' : 'bg-[#404040]'
                  } rounded-full`}></div>
                </div>
                <div className="w-1 h-12 bg-[#404040] rounded"></div>

                <div className="flex items-center">
                  <p className="text-[#D1D1D1] text-sm mr-2">Shipped</p>
                  <div className={`w-1 h-2 ${
                    order.shipping?.orderStatus === 'shipped' ? 'bg-green-500' : 'bg-[#404040]'
                  } rounded-full`}></div>
                </div>
                <div className="w-1 h-12 bg-[#404040] rounded"></div>

                <div className="flex items-center">
                  <p className="text-[#D1D1D1] text-sm mr-2">Delivered</p>
                  <div className={`w-1 h-2 ${
                    order.shipping?.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-[#404040]'
                  } rounded-full`}></div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}

      <h2 className="text-2xl font-medium mt-12">Past Orders</h2>
      {pastOrders.map(order => {
        const firstItem = Array.isArray(order.items) && order.items[0]?.product
        console.log('Rendering past order:', {
          orderId: order.id,
          trackingNumber: order.shipping?.trackingNumber,
          status: order.shipping?.orderStatus || order.status
        })
        
        return (
          <Link href={`/account/orders/${order.id}`} key={order.id}>
            <div className="border border-[#404040] p-5 mt-5 w-full md:w-2/3 rounded-lg flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-[#D1D1D1] text-lg">
                  {typeof firstItem === 'object' ? firstItem.title : 'Order Item'}
                  <span className="text-[#D1D1D1] text-lg mx-3">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(order.total / 100)}
                  </span>
                </p>
                <p className="text-[#D1D1D1] text-lg pt-10">
                  Order ID
                  <span className="text-white block">{order.id}</span>
                </p>
                {order.shipping?.trackingNumber && (
                  <p className="text-[#D1D1D1] text-sm pt-2">
                    Tracking #: {order.shipping.trackingNumber}
                  </p>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
}