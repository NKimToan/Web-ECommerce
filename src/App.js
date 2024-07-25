import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar.js";
import Home from "./Component/Home.js";
import About from "./Component/About.js";
import Products from "./Component/Products.js";
import Cart from "./Component/Cart.js";
import ProductDetails from "./Component/ProductDetails.js";
import ProductDetailInfo from "./Component/ProductDetailInfo.js";
import ProductDetailNutrition from "./Component/ProductDetailNutrition.js";
import ProductDetailStorage from "./Component/ProductDetailStorage.js";
import './App.css';

function App() {
  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
  }, [cart]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }
  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div class="container">
        <Routes>
          <Route path='/' element={<Home />}>
          </Route>
          <Route path='/about' element={<About />}>
          </Route>
          <Route path='/products' element={<Products
            cart={cart}
            onProductAdd={handleProductAdd}
            onProductDelete={handleProductDelete}
          />}>
          </Route>
          <Route path="/products/:id" element={<ProductDetails />}>
            <Route path="" element={<ProductDetailInfo onProductAdd={handleProductAdd} />}></Route>
            <Route
              path="nutrition"
              element={<ProductDetailNutrition />}
            ></Route>
            <Route path="storage" element={<ProductDetailStorage />}></Route>
          </Route>
          <Route path='/cart' element={<Cart cart={cart} />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
