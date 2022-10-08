import create from "zustand";

interface ProductTypes {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
}
interface ProductStoreTypes {
  products: ProductTypes[];
  addProduct: (item: Omit<ProductTypes, "quantity">) => void;
  clearProduct: (id: number) => void;
  removeProduct: (id: number) => void;
}

export const useProductStore = create<ProductStoreTypes>((set) => ({
  products: [],
  addProduct: (item) =>
    set((state) => {
      const p = state.products.find((order) => order.id === item.id);
      if (p) {
        return {
          products: state.products.map((current) => {
            if (current.id === p.id) {
              return {
                ...current,
                quantity: current.quantity + 1,
              };
            } else {
              return current;
            }
          }),
        };
      }

      return {
        products: [...state.products, { ...item, quantity: 1 }],
      };
    }),
  clearProduct: (id) =>
    set((state) => {
      const filterProducts = state.products.filter((item) => item.id !== id);
      return {
        products: filterProducts,
      };
    }),
  removeProduct: (id) =>
    set((state) => {
      const p = state.products.find((item) => item.id === id);
      if (p?.quantity === 1) {
        const filtrProducts = state.products.filter((item) => item.id !== id);
        return {
          products: filtrProducts,
        };
      } else {
        return {
          products: state.products.map((current) => {
            if (current.id === id) {
              return {
                ...current,
                quantity: current.quantity - 1,
              };
            } else {
              return current;
            }
          }),
        };
      }
    }),
}));
