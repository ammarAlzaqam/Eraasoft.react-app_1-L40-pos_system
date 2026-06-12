// File will collect All Global States

import { create } from "zustand";

// Any Shared data will be in the store.
export const domain = "http://localhost:1337";

export let notProductImg =
  "https://motobros.com/wp-content/uploads/2024/09/no-image.jpeg";

// Local State
// const [local, setLocal] = useState("any Value");
// name
// setter function

// Global State.

export const useCart = create((set) => ({
  cart: [],
  setCart: (newValue) => set(() => ({ cart: newValue })),
  addToCart: (product) =>
    set((state) => {
      let exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  decreaseQty: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        if (exists.quantity > 1) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          };
        }

        return { cart: state.cart.filter((item) => item.id !== product.id) };
      }
    }),

  clearCart: () => set(() => ({ cart: [] })),
}));

export const useModal = create((set) => ({
  modalIndex: false,
  setModalIndex: (newValue) => set(() => ({ modalIndex: newValue })),
}));
