import type { Access } from 'payload/config';
import { checkRole } from '../../Users/checkRole'

export const adminsOrCardOwner: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true; // Admins can access all cards
  }

  return {
    user: { equals: user?.id }, // Users can only access cards where they are the user field
  }
}
