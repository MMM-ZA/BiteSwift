import Header from './assets/components/Header';
import Meals from './assets/components/Meals';
import './index.css';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

function App() {
  return (

   <UserProgressContextProvider>
      <CartContextProvider>
      <Header/>
      <Meals/>
     </CartContextProvider>
   </UserProgressContextProvider>
  );
}

export default App;
