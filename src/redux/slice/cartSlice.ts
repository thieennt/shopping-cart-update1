import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

interface ICart {
  id: number;
  name: string;
  image: string;
  price: number;
  cartQuantity: number;
}

export type Cart = {
  cartItems: ICart[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

const initialState: Cart = {
  cartItems:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        notification.success({
          message: "Increased product successfully !",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        notification.success({
          message: "Add to cart successfully !",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decreaseProduct(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        notification.success({
          message: "Decreased product successfully !",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        notification.success({
          message: "Producted removed successfully !",
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );

          state.cartItems = nextCartItems;

          notification.success({
            message: "Producted removed successfully !",
          });
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotal(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      notification.success({
        message: "Cart cleared !",
      });
    },
  },
});

export const {
  addToCart,
  decreaseProduct,
  removeFromCart,
  getTotal,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
