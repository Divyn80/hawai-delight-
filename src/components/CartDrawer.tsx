import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-navy border-l border-white/10 z-50 
                      flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-poppins font-bold text-xl text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-sunset" />
            Your Order
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                     hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
              <p className="text-white/60 font-inter">Your cart is empty</p>
              <p className="text-white/40 text-sm mt-2">Add some delicious treats!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-space font-semibold text-white">{item.name}</p>
                        <p className="text-white/50 text-sm">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/40 hover:text-coral-pink transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center
                                   hover:bg-white/20 transition-all"
                        >
                          <Minus className="w-3 h-3 text-white" />
                        </button>
                        <span className="font-space font-medium text-white w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center
                                   hover:bg-white/20 transition-all"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <p className="font-space font-bold text-sunset">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-inter">Subtotal</span>
              <span className="font-space font-bold text-xl text-white">₹{totalPrice}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full btn-primary text-center"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full btn-secondary text-center text-sm"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          />
          <div className="relative bg-navy border border-white/10 rounded-3xl p-8 max-w-md w-full">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunset/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-sunset" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-2">Order Confirmed!</h3>
              <p className="text-white/60 mb-6">
                Your order total is <span className="text-sunset font-bold">₹{totalPrice}</span>
              </p>
              <div className="space-y-3">
                <p className="text-white/40 text-sm">Payment options:</p>
                <div className="flex gap-3 justify-center">
                  <span className="tag-pill text-xs">UPI</span>
                  <span className="tag-pill text-xs">Card</span>
                  <span className="tag-pill text-xs">Cash</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setIsCartOpen(false);
                  clearCart();
                }}
                className="btn-primary mt-6 w-full"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
