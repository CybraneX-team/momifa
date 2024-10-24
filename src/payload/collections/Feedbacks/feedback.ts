import { CollectionConfig } from 'payload/types';
import { anyone } from '../../access/anyone'
import { checkRole } from '../Users/checkRole'
const Feedback: CollectionConfig = {
  slug: 'feedback',
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
      name: 'product', 
      type: 'relationship',
      relationTo: 'products', 
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1, 
      max: 5, 
    },
    {
      name: 'review', 
      type: 'textarea',
      required: true,
    },
  ],
};

export default Feedback;
