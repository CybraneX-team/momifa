import cron from 'node-cron'
import payload from 'payload'
import { getTrackingInfo } from '../utilities/usps'
import xml2js from 'xml2js'

const updateOrderTracking = async (orderId: string) => {
  try {
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId
    })

    if (!order.shipping?.trackingNumber) {
      console.log(`Order ${orderId} has no tracking number, skipping...`)
      return
    }

    const trackingData = await getTrackingInfo(order.shipping.trackingNumber)
    
    if (!trackingData) {
      console.log(`No tracking data available for order ${orderId}`)
      return
    }

    let orderStatus = order.shipping.orderStatus
    if (trackingData.status?.toLowerCase().includes('delivered')) {
      orderStatus = 'delivered'
    } else if (trackingData.status?.toLowerCase().includes('transit')) {
      orderStatus = 'shipped'
    } else if (trackingData.status?.toLowerCase().includes('label created') || 
               trackingData.status?.toLowerCase().includes('accepted')) {
      orderStatus = 'processing'
    }

    const historyEntry = {
      status: trackingData.status,
      location: trackingData.location,
      timestamp: trackingData.timestamp,
      details: trackingData.details
    }

    await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        shipping: {
          ...order.shipping,
          orderStatus,
          trackingHistory: [
            ...(order.shipping.trackingHistory || []),
            historyEntry
          ]
        }
      }
    })

    console.log(`Updated tracking for order ${orderId}:`, {
      status: orderStatus,
      location: trackingData.location
    })
  } catch (error) {
    console.error(`Error updating tracking for order ${orderId}:`, error)
  }
}

const updateAllOrders = async () => {
  try {
    const orders = await payload.find({
      collection: 'orders',
      where: {
        'shipping.orderStatus': {
          not_equals: 'delivered'
        }
      }
    })

    console.log(`Found ${orders.docs.length} orders to update`)

    for (const order of orders.docs) {
      await updateOrderTracking(order.id)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.error('Error in tracking update cron:', error)
  }
}

export const initializeTrackingCron = () => {
  console.log('Initializing USPS tracking cron job...')
  cron.schedule('0 */2 * * *', () => {
    console.log('Running USPS tracking update...')
    updateAllOrders()
  })
}