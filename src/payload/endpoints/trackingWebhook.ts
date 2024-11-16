import { Response, Request } from 'express'
import payload from 'payload'
import { getTrackingInfo, formatTrackingStatus } from '../utilities/usps'

export const trackingWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await payload.find({
      collection: 'orders',
      where: {
        status: {
          not_equals: 'delivered'
        },
        trackingNumber: {
          exists: true
        }
      }
    })

    for (const order of orders.docs) {
      const trackingData = await getTrackingInfo(order.trackingNumber)
      const formattedStatus = formatTrackingStatus(trackingData)

      if (formattedStatus) {
        let newStatus = order.status

        if (formattedStatus.status.toLowerCase().includes('delivered')) {
          newStatus = 'delivered'
        } else if (formattedStatus.status.toLowerCase().includes('transit')) {
          newStatus = 'shipped'
        } else if (formattedStatus.status.toLowerCase().includes('accepted')) {
          newStatus = 'pickup'
        }

        await payload.update({
          collection: 'orders',
          id: order.id,
          data: {
            status: newStatus,
            trackingStatus: formattedStatus
          }
        })
      }
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Tracking webhook error:', error)
    res.status(500).json({ error: 'Failed to process tracking updates' })
  }
}