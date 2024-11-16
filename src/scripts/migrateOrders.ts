import payload from 'payload'
import { generateTrackingNumber } from '../payload/utilities/usps'

const migrateOrders = async () => {
  try {
    const orders = await payload.find({
      collection: 'orders',
      where: {
        'shipping.trackingNumber': {
          exists: false
        }
      }
    })

    console.log(`Found ${orders.docs.length} orders to migrate`)

    for (const order of orders.docs) {
      const trackingNumber = await generateTrackingNumber()
      const estimatedDelivery = new Date()
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 9)

      const shipping = {
        ...(order.shipping || {}),
        trackingNumber,
        orderStatus: order.shipping?.orderStatus || 'processing',
        estimatedDelivery: estimatedDelivery.toISOString(),
        trackingHistory: order.shipping?.trackingHistory || []
      }

      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          shipping
        }
      })

      console.log(`Updated order ${order.id} with tracking number ${trackingNumber}`)
    }

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

export default migrateOrders