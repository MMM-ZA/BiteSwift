import Header from './assets/components/Header.jsx';
import Meals from './assets/components/Meals.jsx';
import Cart from './assets/components/Cart.jsx'
// import './index.css';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import Checkout from './assets/components/Checkout.jsx';


function App() {
  return (

   <UserProgressContextProvider>
      <CartContextProvider>
      <Header/>
       <Meals/>
      <Cart/>
      <Checkout/>
     </CartContextProvider>
   </UserProgressContextProvider>
  );
}

export default App;
