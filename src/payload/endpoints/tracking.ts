import { Payload } from 'payload'
import { getTrackingInfo } from '../utilities/usps'

export const trackingEndpoint = async (req: any, res: any): Promise<void> => {
  const { trackingNumber } = req.params

  try {
    const trackingInfo = await getTrackingInfo(trackingNumber)
    res.status(200).json(trackingInfo)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracking information' })
  }
}