import { CollectionConfig } from 'payload/types';
import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import { checkRole } from '../Users/checkRole';
import { adminsOrCardOwner } from './Access/cardAccess';
import payload from 'payload';

const Cards: CollectionConfig = {
  slug: 'cards',
  access: {
    read: adminsOrCardOwner,
    create: adminsOrCardOwner,
    update: adminsOrCardOwner,
    delete: adminsOrCardOwner,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'cardHolder',
      type: 'text',
      label: 'Card Holder Name',
      required: true,
    },
    {
      name: 'cardNumber',  
      type: 'text',
      label: 'Card Number',
      required: true,
    },
    {
      name: 'expiry',
      type: 'text',
      label: 'Expiry Date', 
      required: true,
    },
  ],
};

export default Cards;
