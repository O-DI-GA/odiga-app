import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [], // 장바구니 초기 상태
  storeName: "", // 현재 가게 명
  storeId: " ", // 현재 가게 id

  // 가게명 저장
  setStoreName: (name) => set({ storeName: name }),

  // 가게 ID 저장
  setStoreId: (id) => set({ storeId: id }),

  // 메뉴 추가
  addMenu: (menu) =>
    set((state) => {
      const existingMenu = state.cart.find(
        (item) => item.menuId === menu.menuId
      );
      if (existingMenu) {
        // 이미 존재하면 개수 + 1
        return {
          cart: state.cart.map((item) =>
            item.menuId === menu.menuId
              ? { ...item, menuCount: item.menuCount + 1 }
              : item
          ),
        };
      }
      // 개수 초기화, 메뉴 사진 추가
      return {
        cart: [...state.cart, { ...menu, menuCount: 1 }],
      };
    }),

  // 메뉴 삭제
  removeMenu: (menuId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.menuId !== menuId),
    })),

  // 메뉴 개수 설정
  updateMenuCount: (menuId, menuCount) =>
    set((state) => ({
      cart: state.cart
        .map((item) => (item.menuId === menuId ? { ...item, menuCount } : item))
        .filter((item) => item.menuCount > 0), // 수량이 0인 항목은 제거
    })),

  // 장바구니 비우기
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
