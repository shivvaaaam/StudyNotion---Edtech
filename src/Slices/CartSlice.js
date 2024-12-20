import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  total: parseFloat(localStorage.getItem("total")) || 0,
  totalItems: parseInt(localStorage.getItem("totalItems"), 10) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
    
      // Check if price exists and is a number
      if (course.price == null || isNaN(course.price)) {
        console.warn("Course is missing a price:", course);
        toast.error("Course price is unavailable.");
        return;
      }
    
      const index = state.cart.findIndex((item) => item._id === course._id);
      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }
    
      state.cart.push(course);
      state.totalItems++;
      state.total += Number(course.price); // Convert price to a number
    
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    
      toast.success("Course added to cart");
    },
    
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.totalItems--;
        state.total -= Number(state.cart[index].price);
        state.cart.splice(index, 1);

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Course removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
