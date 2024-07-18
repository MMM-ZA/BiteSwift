import burgerLogo from '../images/burgerLogo.png'; 
import { useContext } from 'react';
import CartContext from '../../store/CartContext.jsx';
import UserProgressContext from '../../store/UserProgressContext.jsx';
import Button from '../UI/Button.jsx';



export default function  Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  console.log('userProgressCtx:', userProgressCtx);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
  return totalNumberOfItems + item.quantity;
}, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
      <img src={burgerLogo} alt="Burger Logo" />
        <h1>BiteSwift</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
      </nav>
    </header>

  )



}
