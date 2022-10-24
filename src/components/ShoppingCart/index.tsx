import { Breadcrumb, Empty } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { HiTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addToCart,
  clearCart,
  decreaseProduct,
  getTotal,
  removeFromCart,
} from "../../redux/slice/cartSlice";

const ShoppingCart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleIncreaseCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseProduct(product));
  };

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-wrapper">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="title">Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Your cart is currently empty"
            />
            <div className="start-shopping">
              <Link href="/">
                <div className="start-btn">
                  <BsArrowLeft />
                  <span>Start Shopping</span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-titles">
              <h3 className="product">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
              <h3 className="action">Action</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={cartItem.image} alt={cartItem.name} />
                      <div>
                        <h3>{cartItem.name}</h3>
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleIncreaseCart(cartItem)}>
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.cartQuantity}
                    </div>
                    <div className="cart-product-trash">
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        <HiTrash />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button>Check out</button>
                <div className="continue-shopping">
                  <Link href="/">
                    <div className="continue-btn">
                      <BsArrowLeft />
                      <span>Continue Shopping</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

const allProduct = [
  {
    id: 1,
    name: "Library Stool Chair",
    img: "https://s3-alpha-sig.figma.com/img/b120/dd35/afa230d9c7854e8904bff707a459d920?Expires=1667174400&Signature=gSrJ06~dG-drT8W8141hKG6e7wGaI7wT7oxF6drZOo48aqDCQcJxwLNPemXxrJk2tPVcM9AVZVs2tQAD6onbWzPaA54jwCfN~dwcOD2fs23WEUClvgN8njcrDdCmaIpxpxKeQVew4~4XK8sdAuR~Oxsx-GcF~FGUn6ZxyhhF4O3kcFqvyjtgnwdr33-5SMLEtPlZE091Zp1HT2sZYky61ex7XM1bdaJqW~MsvQZGL910D0FfWiGlEIU-DozbknV~JmPFI41mnvNl6yaiYdG95l5MLtPYy3z32m4BP4MBxLFJj29iEHrvYbyeFtc1rgrfH4jZyBhHZ4VEO1ZMeHFIOQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    price: 30,
    cartQuantity: 2,
  },
  {
    id: 2,
    name: "Library Stool Chair",
    img: "https://s3-alpha-sig.figma.com/img/096d/6bf5/080dc137a17c6a407cb7a13d1dcbf2a4?Expires=1667174400&Signature=ETrfPhsgaeFfWa2Z~sg~pg9uO4tEHCOaoz-jQeeud-5-RaiU3tNDvXoFyv5S7pWcyqrYTIhZgzBpDXoMDlGhTiHcxNWukF1L9GF2jPfFuoBBF01cN34QWBg1L2vlkZ5Bgi09K4CS2L1BI9zwuV3LOTz~dbAV28S90yq9ttCrctxmFPMS2RMfdmcqVBOVm2TDP20IMvDk2RWlpU3dYRaEApF4QJb3ZaZqThd9ti-FFWvvM-Z3rWlquWvAXKON2lz~27ZLmQqaz2Y4VrvKQQ7tpmIaIK6GOaYwCMUid~Gfwnxhfi9ZBFj6-kljxYluI2F6ENKBytbI~H2mD9I6nnp~DQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    price: 20,
    cartQuantity: 2,
  },
];
