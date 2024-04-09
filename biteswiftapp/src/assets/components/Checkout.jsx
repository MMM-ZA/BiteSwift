import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import UserProgressContext from '../../store/UserProgressContext.jsx';
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function Checkout() {
  useContext(CartContext);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  return (
   <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
    <form>
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
