import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false,
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  addToCart: (item) => {
    const { cart } = get();
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);
    
    if (existingItem) {
      set({
        cart: cart.map(cartItem => 
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
        isOpen: true
      });
    } else {
      set({ 
        cart: [...cart, { ...item, quantity: 1 }],
        isOpen: true
      });
    }
  },
  
  removeFromCart: (id, size) => {
    const { cart } = get();
    set({ cart: cart.filter(item => !(item.id === id && item.size === size)) });
  },

  updateQuantity: (id, size, quantity) => {
    const { cart } = get();
    if (quantity === 0) {
      get().removeFromCart(id, size);
      return;
    }
    set({
      cart: cart.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    });
  },

  cartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  cartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
