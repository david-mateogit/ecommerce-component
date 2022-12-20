import { CartTypeProps } from "../types/types";

export default function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  products,
  setCart,
  setProducts
}: CartTypeProps) {
  return (
    <div className="panel cart">
      <h1>Your Cart</h1>

      <ul className="cart-summary">
        {cart &&
          cart.cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <div className="plate">
                <img
                  src={cartItem.image}
                  alt={cartItem["image-title"]}
                  className="plate"
                />
                <div className="quantity">{cartItem.quantity}</div>
              </div>
              <div className="content">
                <p className="menu-item">{cartItem["menu-item"]}</p>
                <p className="price">${cartItem.price}</p>
              </div>
              <button
                className="remove"
                onClick={() => {
                  const { newCart, newProducts } = removeFromCart(
                    cart,
                    cartItem,
                    products
                  );
                  setCart(newCart);
                  setProducts(newProducts);
                }}
              >
                <img src="images/trash.svg" />
              </button>
              <div className="quantity__wrapper">
                <button
                  className="decrease"
                  onClick={() => {
                    if (cartItem.quantity > 1) {
                      const newCart = decreaseQuantity(cart, cartItem);
                      setCart(newCart);
                    }
                  }}
                >
                  <img src="images/chevron.svg" />
                </button>
                <div className="quantity">{cartItem.quantity}</div>
                <button
                  className="increase"
                  onClick={() => {
                    const newCart = increaseQuantity(cart, cartItem);
                    setCart(newCart);
                  }}
                >
                  <img src="images/chevron.svg" />
                </button>
              </div>
              <div className="subtotal">${cartItem.subtotal}</div>
            </li>
          ))}
      </ul>

      <div className="totals">
        <div className="line-item">
          <div className="label">Subtotal:</div>
          <div className="amount price subtotal">
            ${cart?.cartSubtotal || 0}
          </div>
        </div>
        <div className="line-item">
          <div className="label">Tax:</div>
          <div className="amount price tax">${cart?.cartTax || 0}</div>
        </div>
        <div className="line-item total">
          <div className="label">Total:</div>
          <div className="amount price total">${cart?.cartTotal || 0}</div>
        </div>
      </div>
    </div>
  );
}
