import React, { useReducer } from "react";

// Initialise Context and provide data for autocompletion
export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //Update the total amount for all items
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //Find the item to update
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //Use the index to append the item
    const existingCartitem = state.items[existingCartItemIndex];
    //Create a variable to either add a new item or append the amount of the existing item
    let updatedItems;
    if (existingCartitem) {
      //If true - store an updated object in variable
      const updatedItem = {
        ...existingCartitem,
        amount: existingCartitem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      //Use the new array and index to append
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //Concat the new item to the existing array
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    //Find an existing item
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //Use the index to access the item
    const existingItem = state.items[existingItemIndex];
    //Append the overall total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    //Use updatesItems to either filter out an item with an amount of 1 - or subtract from that items amount
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // Store the new object in a variable
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      // Create a new array with the items
      updatedItems = [...state.items];
      //Use the item index to append the item
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
