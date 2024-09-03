import {CollectionConfig} from 'payload/types'
import adminsAndUser from '../Users/access/adminsAndUser'
import { anyone } from '../../access/anyone'
import { checkRole } from '../Users/checkRole'

const wishlist : CollectionConfig = {
    slug: "wishlist",
    access: {
        read: anyone,
        create: anyone,
        update: anyone,
        delete: anyone,
        admin: ({ req: { user } }) => checkRole(['admin'], user),
      },
    fields  : [
        {
            name: "user",
            label: "user",
            type: "relationship",
            relationTo: "users",
            required: true 
        },
        {
            name: "product",
            label: "product",
            type: "relationship",
            relationTo: "products",
            required: true 
        }
    ]
}

export default wishlist 