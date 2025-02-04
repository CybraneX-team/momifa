import type { CartItems, Product, User } from '../../../payload/payload-types'

export type CartItem = CartItems[0]

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        // remove duplicates
        const productId = typeof item.product === 'string' ? item.product : item?.product?.id

        const indexInAcc = acc.findIndex(({ product }) =>
          typeof product === 'string' ? product === productId : product?.id === productId,
        ) // eslint-disable-line function-paren-newline

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // customize the merge logic here, e.g.:
            // quantity: acc[indexInAcc].quantity + item.quantity
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      // if the item is already in the cart, increase the quantity
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem.product === 'string' ? incomingItem.product : incomingItem?.product?.id

      const indexInCart = cart?.items?.findIndex(({ product, size }) =>
        typeof product === 'string' ? product === productId && size === incomingItem.size  
      : product?.id === productId && size === incomingItem.size
        ,
      ) // eslint-disable-line function-paren-newline

      let withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1) {
        withAddedItem.push(incomingItem)
      }

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: (incomingItem.quantity || 0) > 0 ? incomingItem.quantity : undefined,
          size : incomingItem.size
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'DELETE_ITEM': {
      // console.log("🔹 Size to delete (from action.payload):", action.payload.size);
    
      const { product: incomingProduct, size } = action.payload;
      // console.log("🔹 Received product to delete:", incomingProduct);
    
      const normalizeSize = (size) => 
        typeof size === 'string' 
          ? size.toLowerCase().split(":")[0]?.trim()  // Ensure case insensitivity + trim
          : "";
    
      const normalizeProductID = (product) => 
        typeof product === 'string' 
          ? product 
          : product?.id || ""; // Ensure string comparison for product ID
    
      // Ensure we work with a fresh copy of cart items
      const currentItems = [...(cart.items || [])];
    
      // console.log("🛒 Current cart items before deletion:");
      currentItems.forEach(({ product, size: itemSize }, index) => {
        // console.log(`  🔸 Index: ${index}, Product ID: ${normalizeProductID(product)}, Size: ${normalizeSize(itemSize)}`);
      });
    
      // Find index using normalized values
      const indexInCart = currentItems.findIndex(({ product, size: itemSize }) => {
        const normalizedIncomingSize = normalizeSize(size);
        const normalizedCartSize = normalizeSize(itemSize);
    
        const isProductMatch = normalizeProductID(product) === normalizeProductID(incomingProduct);
        const isSizeMatch = normalizedCartSize === normalizedIncomingSize;
    
        // console.log(`  🔍 Checking item - Product ID: ${normalizeProductID(product)}, Item Size: ${normalizedCartSize}, Incoming Size: ${normalizedIncomingSize}, Match: ${isProductMatch && isSizeMatch}`);
    
        return isProductMatch && isSizeMatch;
      });
    
      // console.log("🔎 Result of findIndex:", indexInCart);
    
      if (indexInCart !== -1) {
        // console.log("✅ Deleting item at index:", indexInCart);
    
        // Create a new filtered array instead of mutating
        const updatedItems = currentItems.filter((_, idx) => idx !== indexInCart);
    
        // console.log("🛍️ Updated cart items after deletion:", updatedItems);
    
        return {
          ...cart,
          items: updatedItems, // Ensure a completely new array is assigned
        };
      } else {
        console.log("❌ Item not found in cart.");
      }
    
      return cart; // Return original cart if nothing is deleted
    }
    
    
    
    
    
    
    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}