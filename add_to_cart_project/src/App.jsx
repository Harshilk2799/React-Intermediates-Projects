import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "./App.css";
import { useEffect, useState } from "react";
import productList from "./components/data.js";

function App() {
  const [productId, setProductId] = useState("");
  const [cartAllProduct, setCartAllProduct] = useState([]);
  console.log("Product ID: ", productId);

  useEffect(() => {
    const filterProduct = productList.filter(
      (product) => product.id === productId
    );
    console.log("Filter Product: ", filterProduct);
    setCartAllProduct([...cartAllProduct, ...filterProduct]);
    console.log("Cart All Product: ", cartAllProduct);
  }, [productId]);

  return (
    <>
      <Router>
        <Header cartAllProduct={cartAllProduct} />
        <Routes>
          <Route path="/" element={<Home setProductId={setProductId} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartAllProduct={cartAllProduct}
                setCartAllProduct={setCartAllProduct}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
