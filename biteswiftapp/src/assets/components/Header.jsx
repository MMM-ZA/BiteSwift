import {logo} from "../logo.png";


const Header = () => {


  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo with utensils"/>
        <h1>BiteSwift</h1>
      </div>
      <nav>
        <button>Cart</button>
      </nav>
    </header>

  )



}

export default Header;
