import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempProduct = state.cart.find((i) => i.id === id + color);
    if (tempProduct) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        price: product.price,
        image: product.images[0].url,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload;
    const tempCart = state.cart.filter((cartItem) => cartItem.id !== id);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === "inc" && cartItem.amount < cartItem.max) {
          cartItem.amount++;
        }
        if (value === "desc" && cartItem.amount > 1) {
          cartItem.amount--;
        }
        return cartItem;
      } else {
        return cartItem;
      }
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );

    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
