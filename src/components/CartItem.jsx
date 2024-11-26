/* eslint-disable react/prop-types */
import { IoTrashOutline } from "react-icons/io5";
import { useShopifyContext } from "../services/ShopifyProvider";
import { useEffect } from "react";

const CartItem = (props) => {
    const product = props.item
    const productID = product.id
    const totalCost = product.cost;
    const quantity = product.quantity;
    const image = product.merchandise.image.src
    const price = product.merchandise.price.amount
    const currency = product.merchandise.price.currencyCode
    const title = product.merchandise.product.title

    const { deleteItemFromCheckout, updateItemQuantity } = useShopifyContext();
    const updateQuantity = (event) =>{
        updateItemQuantity(Number(event.target.value), productID);
    }

    return(
        <>
        <div className="cart_product_wrapper">
            <img src={image} alt={title} />
            <div className="cart_product_title">
                <p>{title}</p>
            </div>
            <div className="cart_product_description">
                <div className="cart_product_quantity">
                    <input defaultValue={quantity} onBlur={updateQuantity}/>
                </div>
                <div className="cart_product_price">
                    <p>{price + " " + currency}</p>
                </div>
                <div className="cart_product_delete">
                    <IoTrashOutline onClick={()=> deleteItemFromCheckout(productID)}/>
                </div>
            </div>
            <div className="cart_product_totalCost">
                <p>Precio total:</p>
                <p className="finalItemPrice"> {totalCost.totalAmount.amount + " " + currency}</p>
            </div>
        </div>
        </>
    )
}

export default CartItem;