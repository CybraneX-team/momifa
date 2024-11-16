export const getToken = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('payload-token') : null
    return token
  }
  
  export const fetchOrders = async () => {
    const token = getToken()
    
    if (!token) {
      window.location.href = `/login?error=${encodeURIComponent(
        'You must be logged in to view your orders.',
      )}&redirect=${encodeURIComponent('/orders')}`
      return null
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        cache: 'no-store',
      })
  
      if (!response.ok) throw new Error('Failed to fetch orders')
      const json = await response.json()
      
      if ('error' in json) throw new Error(json.error)
      if ('errors' in json) throw new Error(json.errors[0].message)
      
      return json.docs
    } catch (error) {
      console.error('Error fetching orders:', error)
      return null
    }
  }
  
  export const fetchOrderById = async (orderId: string) => {
    const token = getToken()
    
    if (!token) {
      window.location.href = `/login?error=${encodeURIComponent(
        'You must be logged in to view this order.',
      )}&redirect=${encodeURIComponent(`/orders/${orderId}`)}`
      return null
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      })
  
      if (!response.ok) throw new Error('Failed to fetch order')
      const json = await response.json()
      
      if ('error' in json) throw new Error(json.error)
      if ('errors' in json) throw new Error(json.errors[0].message)
      
      return json
    } catch (error) {
      console.error('Error fetching order:', error)
      return null
    }
  }