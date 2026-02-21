import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from './pages/HomePage';
import Loginpage from './pages/loginpage';
import Register from './pages/Register';
import SingleGame from './pages/SingleGame';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/Games/:Gameid" element={<SingleGame />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
