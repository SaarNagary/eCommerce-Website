import React from "react";
import PaymentDetails from "../../components/PaymentDetails";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { publishableKey } from "../../paypal/config";

const Payment = () => {
  return (
    <div>
      <PayPalScriptProvider options={{ "client-id": publishableKey }}>
        <PaymentDetails />
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
