// import {logo} from '../UI/logo.png';
import Button from '../UI/Button.jsx';


const Header = () => {

  return (
    <header id="main-header">
      <div id="title">
        {/* <img src={logo} alt="logo with utensils"/> */}
        <h1>BiteSwift</h1>
      </div>
      <nav>
        <Button textOnly>Cart</Button>
      </nav>
    </header>

  )



}

export default Header;
