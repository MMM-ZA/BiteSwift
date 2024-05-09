import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import UserProgressContext from '../../store/UserProgressContext.jsx';
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
}
}

export default function Checkout() {
  useContext(CartContext);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {data, isLoading: isSendingData, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig, []);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }


  function handleFinishOrder() {
      userProgressCtx.hideCheckout();
      cartCtx.emptyCart();
      clearData();
  }

  function handleSubmit(event) {
   event.preventDefault();

   const fd = new FormData(event.target);
   const customerData = Object.fromEntries(fd.entries()); // includes all form data as {key: value} pairs

   sendRequest(JSON.stringify({
       order: {
      items: cartCtx.items,
      customer: customerData
     },
    }));


  }


  let actions = (
  <>
    <Button  type="button" textOnly onClick={handleCloseCheckout}>
      Close
    </Button>
    <Button>Submit Order</Button>

  </>
  );

  if (isSendingData) {
    actions = <span>Sending Order Data...</span>;

  }

  if (data && !error) {
    return (
    <Modal open={userProgressCtx.progress === 'checkout'}
     onClose={handleFinishOrder}>
      <h2>Success!</h2>
      <p>Your order has been submitted!</p>
         <p className="modal-actions">
         <Button onClick={handleFinishOrder}>Ok</Button>
      </p>
    </Modal>
    );
  }

  return (
   <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" id="full-name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
         <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

       <p className="modal-actions">{actions}</p>
     </form>
   </Modal>
  );
}
