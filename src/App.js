import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Products from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Checkout from './Components/Checkout/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Shop/>}/>
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="Men"/>}/>
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="Women"/>}/>
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="Kids"/>}/>
            <Route path="/product/:productId" element={<Products/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
          <Route/>
        </Routes>
        <Footer/>  
      </BrowserRouter>
    </div>
  );
}

export default App;
