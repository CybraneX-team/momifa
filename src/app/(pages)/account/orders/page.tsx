import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { RenderParams } from '../../../_components/RenderParams'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

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
      ?.then(json => json.docs)
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      {/* <h5>My Orders</h5>
      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className={classes.noOrders}>You have no orders.</p>
      )}
      <RenderParams />
      {orders && orders.length > 0 && (
        <ul className={classes.orders}>
          {orders?.map(order => (
            <li key={order.id} className={classes.order}>
              <Link className={classes.item} href={`/account/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6 className={classes.itemTitle}>{`Order ${order.id}`}</h6>
                  <div className={classes.itemMeta}>
                    <p>
                      {'Total: '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'usd',
                      }).format(order.total / 100)}
                    </p>
                    <p className={classes.orderDate}>{`Ordered On: ${formatDateTime(
                      order.createdAt,
                    )}`}</p>
                  </div>
                </div>
                <Button
                  appearance="default"
                  label="View Order"
                  className={classes.button}
                  el="link"
                  href={`/account/orders/${order.id}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )} */}
      <h2 className="text-2xl font-medium mt-12">Your Orders</h2>
      <div className="bg-[#181818]  border border-[#404040] p-5 mt-5 w-full md:w-2/3 rounded-lg flex justify-between items-center">
        <div className="flex flex-col ">
          <p className="text-[#D1D1D1] text-lg">
            Polo T-shirt [Blue]
            <span className="text-[#D1D1D1] text-lg mx-3">200$</span>
            <span className="text-[#ffffff] text-sm mt-2 block">Estimated delivery by 17th</span>
          </p>
          <p className="text-[#D1D1D1] text-lg pt-10">
            Order ID
            <span className="text-white block">12345356765245</span>
          </p>

          <p className="text-[#D1D1D1] text-sm pt-10">Cencel Order</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <p className="text-[#D1D1D1] text-sm mr-2">Pickup</p>
            <div className="w-1 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="w-1 h-12 bg-[#404040] rounded"></div>

          <div className="flex items-center">
            <p className="text-[#D1D1D1] text-sm mr-2">Shipped</p>
            <div className="w-1 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="w-1 h-12 bg-[#404040] rounded"></div>

          <div className="flex items-center">
            <p className="text-[#D1D1D1] text-sm mr-2">Delivered</p>
            <div className="w-1 h-2 bg-[#404040] rounded-full"></div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-medium mt-12">Past Orders</h2>
      <div className=" border border-[#404040] p-5 mt-5 w-full md:w-2/3 rounded-lg flex justify-between items-center">
        <div className="flex flex-col ">
          <p className="text-[#D1D1D1] text-lg">
            Polo T-shirt [Blue]
            <span className="text-[#D1D1D1] text-lg mx-3">200$</span>
          </p>

          <p className="text-[#D1D1D1] text-lg pt-10">
            Order ID
            <span className="text-white block">12345356765245</span>
          </p>

          <p className="text-[#D1D1D1] text-sm pt-10">Deliverd on 17th</p>
        </div>
      </div>
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
