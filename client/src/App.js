import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct({
      name: "Awesome Product",
      price: 20,
      productBy: "my company",
    })
  }, [])

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${process.env.REACT_APP_BASE_URL}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then(res => {
        console.log("Response: ", res);
        const {status} = res;
        console.log("Status: ", status)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Stripe Gateway"
          panelLabel="Pay Amount : "
          amount={product.price * 100}
          // shippingAddress
          // billingAddress
        >
          <button className="btn-large pink">
            Awesome Product is just ${product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
