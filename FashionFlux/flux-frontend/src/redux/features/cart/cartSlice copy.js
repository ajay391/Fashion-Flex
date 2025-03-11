import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
};

const calculateSelectedItems = (state) =>
    state.products.reduce((total, product) => total + product.quantity, 0);

const calculateTotalPrice = (state) =>
    state.products.reduce((total, product) => total + product.quantity * product.price, 0);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                console.log("Item already added");
            }

            // Recalculate totals
            state.selectedItems = calculateSelectedItems(state);
            state.totalPrice = calculateTotalPrice(state);
            state.tax = state.totalPrice * state.taxRate;
            state.grandTotal = state.totalPrice + state.tax;
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
