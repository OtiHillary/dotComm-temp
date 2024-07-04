import './App.css'
import Home from './pages/home';
import Contact from './pages/contact';
import Login from './pages/login';
import Checkout from './pages/checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, NoLayout } from './layout';



function App() {
  const layoutElem = (jsxElem) => <Layout>{jsxElem}</Layout>
  const noLayoutElem = (jsxElem) => <NoLayout>{jsxElem}</NoLayout>


  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={ layoutElem(<Home />) } />
              <Route path="/cart" element={ layoutElem(<Checkout />) } />
              <Route path="/contact" element={ layoutElem(<Contact />) } />              
              <Route path="/login" element={ noLayoutElem(<Login />) } />
          </Routes>
      </Router>  
    </>
     

  )
}

export default App
