import cartModel from "../models/cartModel.js";
// ! OLD CART LOGIC
// export const createCartController = async (req, res) => {
//     const { pid, uid } = req.body;
//     try {
//         const existingCartItem = await cartModel.findOne({ userId: uid, productId: pid });
//         if (existingCartItem) {
//             return res.status(400).json({ message: "This product is already added to cart" })
//         } else {
//             // save category
//             const newCart = await new cartModel({
//                 userId: uid,
//                 productId: pid,
//             })
//             const saveCart = await newCart.save()
//             if (saveCart) {
//                 return res.status(200).json({ message: "Item is added to cart" })
//             }




//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }

// }
// ! OLD CART LOGIC



// ! NEW  CART CREAT  LOGIC  
export const createCartController = async (req, res) => {
    const { pid, uid } = req.body;
    try {
        const existingCartItem = await cartModel.findOne({ userId: uid, productId: pid });
        if (existingCartItem) {
            if (existingCartItem.quantity >= 5) {
                return res.status(400).json({ message: "This product is already added to cart and the quantity is already at the maximum limit (5)." });
            } else {
                existingCartItem.quantity++;
                await existingCartItem.save();
                return res.status(200).json({ message: "Product quantity increased in cart." });
            }
        } else {
            // save category
            const newCart = await new cartModel({
                userId: uid,
                productId: pid,
            })
            const saveCart = await newCart.save()
            if (saveCart) {
                return res.status(200).json({ message: "Item is added to cart" })
            }




        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

// ! NEW  CART CREAT  LOGIC  



// export const showCartController = async (req, res) => {
//     const userId = req.params.uid;
//     try {
//         const cartItems = await cartModel.find({ userId }).populate('userId').populate('productId');
//         if (cartItems) {
//             const productArray = cartItems.map(item => item.productId); // Extract productIds from cartItems
//             return res.status(200).json({ message: "Your Cart Item", total_Item: cartItems.length, cartItems: productArray });
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// }


export const showCartController = async (req, res) => {
    const userId = req.params.uid;
    try {
        const cartItems = await cartModel.find({ userId }).populate('userId').populate('productId');
        if (cartItems) {
            const productArray = cartItems.map(item => ({
                product: item.productId,
                quantity: item.quantity
            }));
            return res.status(200).json({ message: "Your Cart Item", total_Item: cartItems.length, cartItems: productArray });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};




export const updateQtyController = async (req, res) => {
    const { pid, uid, qty } = req.body;
    try {
        // Find the cart document with matching productId and userId
        const cartItem = await cartModel.findOneAndUpdate(
            { userId: uid, productId: pid },
            { quantity: qty }, // Update the quantity field
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        return res.status(200).json({ message: "Quantity updated successfully", updatedCartItem: cartItem });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// DELETE  SELECTED PRODUCT FROM CART

export const deleteSelectedCartProductController = async (req, res) => {
    const { pid, uid } = req.query;
    try {
        const cartItem = await cartModel.findOneAndDelete({ productId: pid, userId: uid });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}


export const clearCartController = async (req, res) => {
    const userId = req.params.uid;
    try {
        const cartItems = await cartModel.deleteMany({ userId });
        if (cartItems) {
            return res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}




export const getCartItemCountController = async (req, res) => {
    const userId = req.params.uid;
    try {
        const cartItems = await cartModel.find({ userId });

        const itemCount = cartItems.length;

        return res.status(200).json({ itemCount });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};













