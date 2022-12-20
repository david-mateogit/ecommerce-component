import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Panel from "./components/Panel";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "./controllers/actions";
import Data from "./database/menuItems.json";
import { CartProps, ProductInCart } from "./types/types";

const initialCart: CartProps = {
  cartItems: [],
  cartSubtotal: 0,
  cartTax: 0,
  cartTotal: 0
};

function App() {
  const [products, setProducts] = useState<ProductInCart[]>(Data.products);
  const [cart, setCart] = useState<CartProps>(initialCart);

  return (
    <div className="wrapper menu">
      <Panel
        cart={cart}
        products={products}
        addToCart={addToCart}
        setCart={setCart}
        setProducts={setProducts}
      />
      <Cart
        cart={cart}
        products={products}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        setCart={setCart}
        setProducts={setProducts}
      />
    </div>
  );
}

export default App;
