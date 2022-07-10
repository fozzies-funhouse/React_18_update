import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./AppStyle.css";

import { BrowserRouter } from "react-router-dom";
import StripeCard from "./StripeCard";

const PUBLIC_KEY =
  "pk_test_51LIHOVLcfdacnvzyenB7TQ2IsTKewgB4fCfpWokK5brUbLG1yw1ucRn1KyIuTWo8Mv6xjLtSXOfrqQ7aU9cu9Pdg009BJjult9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <div>
      <BrowserRouter>
        <Elements stripe={stripeTestPromise}>
          <StripeCard />
        </Elements>
      </BrowserRouter>
    </div>
  );
}
