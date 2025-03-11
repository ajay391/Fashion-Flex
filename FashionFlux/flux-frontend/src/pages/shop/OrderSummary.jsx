import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';

const OrderSummary = () => {
    const dispatch = useDispatch()
    const products = useSelector((store) => store.cart.products);
    const {  selectedItems, totalPrice ,tax, taxRate, grandTotal} = useSelector((store) => store.cart);

    const handleClearCart = () => {
        dispatch(clearCart())
    }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
      <p className="text-gray-700 mb-2">Selected Items: {selectedItems}</p>
      <p className="text-gray-700 mb-2">Total Price: <span className="font-medium">$ {totalPrice.toFixed(2)}</span></p>
      <p className="text-gray-700 mb-2">
        Tax ({(taxRate * 100).toFixed(0)}%): <span className="font-medium">$ {tax.toFixed(2)}</span>
      </p>
      <h3 className="text-xl font-bold text-gray-800 mt-4">Grand Total: <span className="text-green-600">$ {grandTotal.toFixed(2)}</span></h3>
    </div>
  
    <div className="flex justify-between px-6 py-4 bg-gray-100 border-t">
      <button className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition duration-200"
      onClick={(e)=>{
        e.stopPropagation();
        handleClearCart();
      }}
      >
        Clear Cart
      </button>
      <button className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition duration-200">
        Proceed Checkout
      </button>
    </div>
  </div>
  
  )
}

export default OrderSummary