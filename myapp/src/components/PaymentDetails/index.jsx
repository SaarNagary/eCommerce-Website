import React, { useCallback, useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { apiInstance } from "../../Utils";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../redux/Cart/cart.selectors";
import { clearCart } from "../../redux/Cart/cart.actions";
import { createStructuredSelector } from "reselect";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import "./styles.css";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};


const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {total, itemCount, cartItems} = useSelector(createStructuredSelector({
    total : selectCartTotal,
    itemCount : selectCartItemsCount,
    cartItems: selectCartItems,
  }))

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if(itemCount < 1) {
      navigate('/dashboard')
    }
  }, [itemCount, navigate])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      alert("Please ensure all address fields are completed.");
      return;
    }
    /*try {
      // שליחת בקשה לשרת Firebase כדי ליצור את התשלום
      const { data: clientSecret } = await apiInstance.post('/payments/create', {
        amount: total * 100, // תשלום בכסף
        shipping: {
          name: recipientName,
          address: { ...shippingAddress },
        }
      });
      dispatch(clearCart());
      alert("Payment successful, cart cleared")
        } catch(error) {
          console.error("Error creating payment:", error);
          alert("Payment failed")
        }*/
        /*dispatch(clearCart());*/
        const configOrder = {
          orderTotal: total,
          orderItems: cartItems.map(item => {
            const {documentID, productThumbnail, productName, productPrice, quantity} = item
            return {
              documentID, productThumbnail, productName, productPrice, quantity
            }
          })
        }
        dispatch(saveOrderHistory(configOrder))
        dispatch(clearCart());
        alert("Cart cleared. Redirecting to homepage.");
        navigate("/");
      }

    

  const handleShipping = useCallback((e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleBilling = useCallback((e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={handleShipping}
            value={shippingAddress.line1}
            type="text"
          />
          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={handleShipping}
            value={shippingAddress.line2}
            type="text"
          />
          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={handleShipping}
            value={shippingAddress.city}
            type="text"
          />
          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={handleShipping}
            value={shippingAddress.state}
            type="text"
          />
          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={handleShipping}
            value={shippingAddress.postal_code}
            type="text"
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: { name: "country", value: val },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput
            required
            placeholder="Name on Card"
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={handleBilling}
            value={billingAddress.line1}
            type="text"
          />
          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={handleBilling}
            value={billingAddress.line2}
            type="text"
          />
          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={handleBilling}
            value={billingAddress.city}
            type="text"
          />
          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={handleBilling}
            value={billingAddress.state}
            type="text"
          />
          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={handleBilling}
            value={billingAddress.postal_code}
            type="text"
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleBilling({
                  target: { name: "country", value: val },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Card Details</h2>
        </div>
        <div className="paypalButton">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                      },
                      shipping: {
                        name: {
                          full_name: recipientName,
                        },
                        address: {
                          address_line_1: shippingAddress.line1,
                          address_line_2: shippingAddress.line2,
                          admin_area_1: shippingAddress.state,
                          admin_area_2: shippingAddress.city,
                          postal_code: shippingAddress.postal_code,
                          country_code: shippingAddress.country,
                        },
                      },
                    },
                  ],
                })
                .catch((error) => {
                  console.error("Error creating order: ", error);
                });
            }}
            onApprove={async (data, actions) => {
              try {
                const order = await actions.order.capture();
                console.log("Order Successful: ", order);
                dispatch(clearCart());
                alert("Payment successful!");
              } catch (error) {
                console.error("Error capturing order: ", error);
                alert("Payment failed. Please try again.");
              }
            }}
          />
        </div>
        <Button type="submit">
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
