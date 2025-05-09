import React, { useEffect, useState } from "react";

function Cart({ cartAllProduct, setCartAllProduct }) {
  const [totalPriceProducts, setTotalPriceProducts] = useState("");
  function handleIncrement(id) {
    console.log("ID: ", id);
    setCartAllProduct((prevState) => {
      return prevState.map((product) => {
        if (product?.id === id) {
          const newCount = product?.count + 1;
          return { ...product, count: newCount, price: product.price };
        } else {
          return product;
        }
      });
    });
  }

  function handleDeleteItem(id) {
    setCartAllProduct((prevState) => {
      return prevState.filter((product) => product?.id !== id);
    });
  }

  function handleDecrement(id) {
    setCartAllProduct((prevState) => {
      return prevState.map((product) => {
        if (product?.id === id && product?.count > 1) {
          const newCount = product?.count - 1;
          console.log("Count: ", product.count);
          return { ...product, count: newCount, price: product.price };
        } else {
          return product;
        }
      });
    });
  }

  console.log(cartAllProduct);

  useEffect(() => {
    const finalTotal = cartAllProduct.reduce((acc, product) => {
      return acc + product.price * product.count;
    }, 0);

    setTotalPriceProducts(finalTotal);
  }, [cartAllProduct]);
  return (
    <div className="container-fluid">
      <div className="row p-3 gap-3">
        {cartAllProduct?.map((product) => {
          return (
            <div
              className="col-8 border rounded d-flex gap-3"
              key={parseInt(product?.id)}
            >
              <div className="p-1">
                <img
                  src={product?.img}
                  alt={product?.model}
                  className="cart-product-size"
                />
              </div>
              <div className="p-1 d-flex gap-3">
                <div>
                  <h3 className="text-hiding m-0">
                    {product?.model?.toUpperCase()}
                  </h3>
                  <p className="m-0 fs-5">
                    <span className="font-bold ">₹</span>{" "}
                    {product?.price * product?.count}
                  </p>
                  <p className="m-0 font-size-12 font-bold">{product?.space}</p>
                  <p className="m-0 font-size-12 font-bold">
                    {product?.camera}
                  </p>
                  <div className="d-flex gap-3 mt-1">
                    <p
                      className="m-0 border p-0 px-2 py-1 rounded pointer"
                      onClick={() => handleDecrement(product?.id)}
                    >
                      -
                    </p>
                    <p className="m-0 ">{product?.count}</p>
                    <p
                      className="m-0 border p-0 px-2 py-1 rounded pointer"
                      onClick={() => handleIncrement(parseInt(product?.id))}
                    >
                      +
                    </p>
                  </div>
                </div>

                <div className="d-flex">
                  <p>{product?.description}</p>
                  <p onClick={() => handleDeleteItem(product?.id)}>
                    <i className="fa-solid fa-trash text-danger pointer"></i>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {totalPriceProducts > 0 && (
          <div className="col-12 d-flex justify-content-end mt-4">
            <div
              className="total-box border rounded shadow-sm p-4 bg-white w-100"
              style={{ maxWidth: "400px" }}
            >
              <h4 className="mb-3 d-flex justify-content-between align-items-center">
                <span>Total</span>
                <i className="fa-solid fa-cart-shopping text-primary"></i>
              </h4>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fs-5 fw-bold">Total Price:</span>
                <span className="fs-5 text-success fw-bold">
                  ₹{totalPriceProducts}
                </span>
              </div>
              <button className="btn btn-primary mt-4 w-100 fw-semibold">
                Proceed to Checkout <i className="fa fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {cartAllProduct.length == 0 && (
          <div className="col-12">
            <h1 className="text-center fs-3">No Products Availabe in Cart</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
