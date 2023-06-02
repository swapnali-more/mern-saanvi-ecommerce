import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddProduct, Admin, Cart, Checkout, Home, Orders, Profile, Products, Auth, ProductDetail, NotFound } from './Containers';
import { Header } from './Components';
import PrivateRoute from './Constant/PrivateRoute';
import { checkAuthentication } from './Constant/APIResponse';

const App = () => {

  const responseString = localStorage.getItem('profile');
  const isAuthenticated = checkAuthentication(responseString);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/add-product"
            element={
              <PrivateRoute component={AddProduct} isAdminOnly={true} />
            }
          />
          <Route
            path="/admin"
            element={<PrivateRoute component={Admin} isAdminOnly={true} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute component={Cart} />}
          />
          <Route
            path="/checkout"
            element={<PrivateRoute component={Checkout} />}
          />
          <Route
            path="/orders"
            element={<PrivateRoute component={Orders} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          {!isAuthenticated && <Route path="/auth" element={<Auth />} /> }
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
