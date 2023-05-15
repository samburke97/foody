import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (userData, items) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        message: "Pending",
        title: "Sending your order...",
        status: "pending",
      })
    );

    try {
      const response = await fetch(
        "https://react-http-b681a-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          title: "Success",
          message: "Your order is on its way",
          status: "success",
        })
      );
      dispatch(cartActions.clearCart());
      dispatch(uiActions.clearNotification);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
