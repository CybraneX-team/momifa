import type { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { generateTrackingNumber } from '../../utilities/usps'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy', 'status'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const user = req.user
        try {
          // If orderedBy is a string (user ID), keep it as is
          const orderedBy = typeof data.orderedBy === 'string' 
            ? data.orderedBy 
            : user?.id || data.orderedBy

          // Generate tracking info
          const trackingNumber = await generateTrackingNumber()
          const estimatedDelivery = new Date()
          estimatedDelivery.setDate(estimatedDelivery.getDate() + 9)

          // Return the complete data object
          return {
            ...data,
            orderedBy,
            status: 'pending',
            shipping: {
              trackingNumber,
              orderStatus: 'processing',
              estimatedDelivery: estimatedDelivery.toISOString(),
              trackingHistory: []
            }
          }
        } catch (error) {
          console.error('Error in beforeValidate hook:', error)
          return data
        }
      }
    ]
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'shipping',
      type: 'group',
      admin: {
        description: 'Shipping information (auto-generated)',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'trackingNumber',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'orderStatus',
          type: 'select',
          options: [
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Delivered', value: 'delivered' },
          ],
        },
        {
          name: 'estimatedDelivery',
          type: 'date',
        },
        {
          name: 'trackingHistory',
          type: 'array',
          fields: [
            {
              name: 'status',
              type: 'text',
            },
            {
              name: 'location',
              type: 'text',
            },
            {
              name: 'timestamp',
              type: 'date',
            },
            {
              name: "size",
              type: "text"
            }
          ],
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
    {
      name: 'stripePaymentIntentID',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}