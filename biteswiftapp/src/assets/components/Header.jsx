// import {logo} from '../UI/logo.png';
import { useContext } from 'react';
import Button from '../UI/Button.jsx';
import CartContext from '../../store/CartContext.jsx';
import UserProgressContext from '../../store/UserProgressContext.jsx';


export default function  Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx =  useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
  return totalNumberOfItems + item.quantity;
}, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">

        <h1>BiteSwift</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
      </nav>
    </header>

  )



}
