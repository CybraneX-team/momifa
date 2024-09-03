export const addToWishlist = async (productId: string, userId:string) =>{
    try {
        const response = await fetch("http://localhost:3000/api/wishlist", {
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
        console.log(`data :`, data)
        return data 
    } catch (error) {
        console.log("some error", error)
    }
}