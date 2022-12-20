import { PanelTypeProps } from "../types/types";

export default function Panel({
  products,
  cart,
  addToCart,
  setProducts,
  setCart
}: PanelTypeProps) {
  return (
    <div className="panel">
      <h1>To Go Menu</h1>
      <ul className="menu">
        {products.map((product) => (
          <li key={product.id}>
            <div className="plate">
              <img
                src={product.image}
                alt={product["image-title"]}
                className="plate"
              />
            </div>
            <div className="content">
              <p className="menu-item">{product["menu-item"]}</p>
              <p className="price">${product.price}</p>
              {product.inCart ? (
                <button className="in-cart">
                  <img src="images/check.svg" alt="Check" />
                  In Cart
                </button>
              ) : (
                <button
                  className="add"
                  onClick={() => {
                    const { newCart, newProducts } = addToCart(
                      cart,
                      product,
                      products
                    );
                    setCart(newCart);
                    setProducts(newProducts);
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
