import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { generateTrackingNumber } from '../../../utilities/usps'

export const beforeCreate: BeforeChangeHook = async ({ data, req }) => {
  console.log('Creating new order with data:', data)

  try {
    const trackingNumber = await generateTrackingNumber()
    console.log('Generated tracking number:', trackingNumber)

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 9)

    const shipping = {
      trackingNumber,
      orderStatus: 'processing',
      estimatedDelivery: estimatedDelivery.toISOString(),
      trackingHistory: []
    }

    console.log('Generated shipping data:', shipping)
    return {
      ...data,
      status: 'pending',
      shipping
    }
  } catch (error) {
    console.error('Error in beforeCreate hook:', error)
    throw error
  }
}