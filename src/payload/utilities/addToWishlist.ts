export const addToWishlist = async (productId: string, userId:string) =>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
            method: "POST", 
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                user: userId,
                product: productId
            })
        })
        const data = await response.json() 
        return data 
    } catch (error) {
        console.log("some error", error)
    }
}