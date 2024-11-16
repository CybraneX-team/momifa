import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { generateTrackingNumber } from '../../../utilities/usps'

export const beforeChangeHook: BeforeChangeHook = async ({ req, data, operation }) => {
  if (operation === 'create') {
    if (req.user) {
      data.orderedBy = req.user.id
    }
  }
  
  if (operation === 'create') {
    try {
      const trackingNumber = await generateTrackingNumber()
      console.log('Generated tracking number:', trackingNumber)
      
      const estimatedDelivery = new Date()
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 9)

      return {
        ...data,
        shipping: {
          trackingNumber,
          orderStatus: 'processing',
          estimatedDelivery: estimatedDelivery.toISOString(),
          trackingHistory: []
        }
      }
    } catch (error) {
      console.error('Error generating tracking number:', error)
      return data
    }
  }

  return data
}