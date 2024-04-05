import { useContext } from 'react';
import Modal from '../UI/Modal.jsx';
import CartContext from '../../store/CartContext.jsx';
import { currencyFormatter } from '../../util/formatting.js';
import Button from '../UI/Button.jsx';
import UserProgressContext from '../../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';


export default function Cart() {

// Assessing the context
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);


//Total Cart items
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  //handle closing Modal
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }


  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
    <h2>Cart</h2>
    <ul>
     {cartCtx.items.map((item) => (
      <CartItem key={item.id}
        name={item.name}
       quantity={item.quantity}
        price={item.price}
        onIncrease={() => cartCtx.addItem(item)}
        onDecrease={() => cartCtx.removeItem(item.id)}
        />
     ))}
    </ul>
   <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
   <p className='modal-actions'>
    <Button textOnly onClick={handleCloseCart}>Close</Button>
    {cartCtx.items.length > 0 &&
    <Button onClick={handleCloseCart}>Go to Checkout</Button>}
   </p>

    </Modal>
  );

}
