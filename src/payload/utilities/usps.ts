import axios from 'axios'
import crypto from 'crypto'

const USPS_API_URL = process.env.USPS_API_URL
const USPS_USER_ID = process.env.USPS_USER_ID

export const generateTrackingNumber = async () => {
  try {
    const timestamp = Date.now().toString().slice(-8)
    const random = crypto.randomBytes(2).toString('hex')
    const trackingNumber = `9400${timestamp}${random}US`
    console.log('Generated new tracking number:', trackingNumber)
    return trackingNumber
  } catch (error) {
    console.error('Error generating tracking number:', error)
    return `9400${Date.now()}TEST`
  }
}

export const getTrackingInfo = async (trackingNumber: string) => {
  if (!trackingNumber) {
    console.log('No tracking number provided to getTrackingInfo')
    return null
  }

  console.log('Fetching tracking info for:', trackingNumber)

  const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <TrackFieldRequest USERID="${USPS_USER_ID}">
      <TrackID ID="${trackingNumber}"></TrackID>
    </TrackFieldRequest>
  `

  try {
    const response = await axios.get(USPS_API_URL, {
      params: {
        API: 'TrackV2',
        XML: xml
      }
    })

    console.log('USPS API Response:', response.data)
    return response.data
  } catch (error) {
    console.error('USPS Tracking Error:', error)
    return null
  }
}

export const formatTrackingStatus = (trackingData: any) => {
  if (!trackingData) {
    console.log('No tracking data to format')
    return null
  }

  try {
    const formattedData = {
      status: trackingData.Status || 'Pending',
      location: trackingData.Location || 'Processing',
      timestamp: trackingData.Timestamp || new Date().toISOString(),
      details: trackingData.Details || 'Order is being processed'
    }

    console.log('Formatted tracking data:', formattedData)
    return formattedData
  } catch (error) {
    console.error('Error formatting tracking data:', error)
    return null
  }
}