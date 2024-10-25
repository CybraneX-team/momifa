import { CollectionConfig } from 'payload/types';
import { anyone } from '../../access/anyone'
import { checkRole } from '../Users/checkRole'
import fetchCoordinates from './utils/geocode';

const Address: CollectionConfig = {
  slug: 'address',
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: anyone,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        required: true,
    },
    {
      name: 'street',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'latitude',
      type: 'number', 
    },
    {
      name: 'longitude',
      type: 'number',
    },
  ],
};
Address.hooks = {
  beforeChange: [
    async ({ data, operation }) => {
      if (operation === 'create' || operation === 'update') {
        const fullAddress = `${data.street}, ${data.city}, ${data.state}, ${data.postalCode}, ${data.country}`;
        const coordinates = await fetchCoordinates(fullAddress);
        if (coordinates) {
          data.latitude = coordinates.lat;
          data.longitude = coordinates.lng;
        }
      }
    }
  ]
};
export default Address;
