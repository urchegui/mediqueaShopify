import { useShopifyContext } from "../services/ShopifyProvider";
import "./cart.scss";
import { useEffect, useMemo } from "react";
import CartItem from "./CartItem.jsx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state, showCartItems, handleCartToggle, checkouturl } = useShopifyContext(); // Añadimos checkouturl
  const { isCartOpen, checkout, productQuantity, cartQuantity, cartPrice, checkoutUrl } = state;
  const itemsKey = useMemo(() => JSON.stringify(productQuantity), [productQuantity]);

  const isCartOpenMemo = useMemo(() => isCartOpen, [isCartOpen]);

  // Obtén la URL del checkout si no está presente
  useEffect(() => {
    if (!checkoutUrl) {
      checkouturl(); // Obtener la URL del checkout si no está cargada
    }
  }, [checkoutUrl, checkouturl]);

  useEffect(() => {
    if (isCartOpenMemo) {
      showCartItems();
    }
  }, [isCartOpenMemo, itemsKey, cartQuantity]);

  return (
    <>
      <div className={`cart-drawer ${isCartOpen ? "open" : "closed"}`}>
        <div className="title">
          <div className="closeCart">
            <IoClose onClick={handleCartToggle} />
          </div>
          <h1>Tu carrito</h1>
        </div>
        <div className="cartItems">
          {checkout && checkout.length > 0 ? (
            checkout.map((item, idx) => {
              return <CartItem key={idx} item={item.node} />;
            })
          ) : (
            <div className="emptyCart">
              <p>El carrito está vacío.</p>
            </div>
          )}
        </div>
        <div className="bottomCart">
          <div className="totalPrice">
            <p>Precio Final:</p>
            {cartPrice && cartPrice.totalAmount.amount > 0 ? (
              <p className="totalPrice_price">
                {cartPrice.totalAmount.amount + " " + cartPrice.totalAmount.currencyCode}
              </p>
            ) : (
              <p className="totalPrice_price">0 EUR</p>
            )}
          </div>
          <div className="checkout-button_wrapper">
            {checkoutUrl ? (
              <button type="button">
                <Link to={checkoutUrl}>Ir al pago</Link>
              </button>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
