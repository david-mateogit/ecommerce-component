import { ProductInCart, CartProps, CartItem } from "../types/types";

function calcTotals(cartItemsArr: CartItem[]) {
  const cartSubTotal =
    Math.round(
      cartItemsArr.reduce((acc, curr) => acc + curr.subtotal, 0) * 100
    ) / 100;
  const cartTaxTotal = Math.round(cartSubTotal * 0.16 * 100) / 100;
  const cartTotal = Math.round((cartSubTotal + cartTaxTotal) * 100) / 100;
  return { cartSubTotal, cartTaxTotal, cartTotal };
}

export function addToCart(
  cart: CartProps,
  item: ProductInCart,
  products: ProductInCart[]
) {
  const itemToCart: CartItem = {
    ...item,
    inCart: true,
    quantity: 1,
    subtotal: item.price
  };
  const cartItemsArr = [...cart.cartItems, itemToCart];

  const { cartSubTotal, cartTaxTotal, cartTotal } = calcTotals(cartItemsArr);

  const newCart: CartProps = {
    ...cart,
    cartItems: cartItemsArr,
    cartSubtotal: cartSubTotal,
    cartTax: cartTaxTotal,
    cartTotal: cartTotal
  };
  const newProducts = toggleInCart(products, item);
  return { newCart, newProducts };
}

export function removeFromCart(
  cart: CartProps,
  item: ProductInCart,
  products: ProductInCart[]
) {
  const cartItemsArr = cart.cartItems.filter((c) => c.id !== item.id);

  const { cartSubTotal, cartTaxTotal, cartTotal } = calcTotals(cartItemsArr);

  const newCart: CartProps = {
    ...cart,
    cartItems: cartItemsArr,
    cartSubtotal: cartSubTotal,
    cartTax: cartTaxTotal,
    cartTotal: cartTotal
  };
  const newProducts = toggleInCart(products, item);
  return { newCart, newProducts };
}

export function increaseQuantity(cart: CartProps, item: CartItem) {
  const cartItemsArr = cart.cartItems.map((cartItem) => {
    if (cartItem.id === item.id) {
      return {
        ...cartItem,
        quantity: cartItem.quantity + 1,
        subtotal:
          Math.round(cartItem.price * (cartItem.quantity + 1) * 100) / 100
      };
    } else {
      return cartItem;
    }
  });

  const { cartSubTotal, cartTaxTotal, cartTotal } = calcTotals(cartItemsArr);

  const newCart: CartProps = {
    ...cart,
    cartItems: cartItemsArr,
    cartSubtotal: cartSubTotal,
    cartTax: cartTaxTotal,
    cartTotal: cartTotal
  };

  return newCart;
}

export function decreaseQuantity(cart: CartProps, item: CartItem) {
  const cartItemsArr = cart.cartItems.map((cartItem) => {
    if (cartItem.id === item.id && cartItem.quantity > 1) {
      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
        subtotal:
          Math.round(cartItem.price * (cartItem.quantity - 1) * 100) / 100
      };
    } else {
      return cartItem;
    }
  });

  const { cartSubTotal, cartTaxTotal, cartTotal } = calcTotals(cartItemsArr);

  const newCart: CartProps = {
    ...cart,
    cartItems: cartItemsArr,
    cartSubtotal: cartSubTotal,
    cartTax: cartTaxTotal,
    cartTotal: cartTotal
  };

  return newCart;
}

function toggleInCart(products: ProductInCart[], product: ProductInCart) {
  const newProducts = products.map((p) => {
    if (p.id === product.id) {
      return {
        ...p,
        inCart: !product.inCart
      };
    } else {
      return p;
    }
  });
  return newProducts;
}
