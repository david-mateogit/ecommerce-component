type Product = {
  id: number;
  "menu-item": string;
  price: number;
  image: string;
  "image-title": string;
};

export interface ProductInCart extends Product {
  inCart?: boolean;
}

export interface CartItem extends ProductInCart {
  quantity: number;
  subtotal: number;
}

export type CartProps = {
  cartItems: CartItem[];
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
};

type CartProductsProps = {
  cart: CartProps;
  products: ProductInCart[];
  setProducts: React.Dispatch<React.SetStateAction<ProductInCart[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartProps>>;
};

export interface CartTypeProps extends CartProductsProps {
  increaseQuantity: (cart: CartProps, item: CartItem) => CartProps;
  decreaseQuantity: (cart: CartProps, item: CartItem) => CartProps;
  removeFromCart(
    cart: CartProps,
    item: ProductInCart,
    products: ProductInCart[]
  ): {
    newCart: CartProps;
    newProducts: ProductInCart[];
  };
}

export interface PanelTypeProps extends CartProductsProps {
  addToCart(
    cart: CartProps,
    item: ProductInCart,
    products: ProductInCart[]
  ): {
    newCart: CartProps;
    newProducts: ProductInCart[];
  };
}
