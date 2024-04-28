import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import UserProgressContext from '../../store/UserProgressContext.jsx';
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../../hooks/useHttp.js";

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

  const {data, isLoading: isSendingData, error, sendRequest} = useHttp('http://localhost:3000/orders', requestConfig, []);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
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

      <p className="modal-actions">
        <Button  type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
        <Button>Submit Order</Button>
      </p>
    </form>
   </Modal>
  );
}
