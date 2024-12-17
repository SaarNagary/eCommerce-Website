/*import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.css";
import Button from "../Forms/Button";
import Item from "./Item";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(
    createStructuredSelector({ cartItems: selectCartItems })
  );
  const {total} = useSelector(
    createStructuredSelector({total : selectCartTotal})
  )
  const errMsg = 'You have no items in your cart.'

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                <tbody>
                  <tr>
                    <th>
                      Product
                    </th>
                    <th>
                      Description
                    </th>
                    <th>
                      Quantity
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Remove                                                                       
                    </th>
                  </tr>
                </tbody>
              </table>
            </tr>
            <tr>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  {
                    cartItems.map((item, pos) => {
                     return (
                    <tr key={pos}>
                    <td>
                      <Item {...item}/>
                    </td>
                  </tr>
                    )})
                  }
                </tbody>
              </table>
            </tr>
            <tr>
              <table align="right" border="0" cellPadding="10" cellSpacing="0">
                <tr align="right">
                  <td>
                    <h3>
                      Total: ${total}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <table border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <Button onClick={() => navigate(-1)}>
                            Continue Shopping
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => navigate('/payment')}>
                            Checkout
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </table>
            </tr>
          </tbody>
        </table>
        ) : (
          <p>
            {errMsg}
          </p>
        )}
      </div>
    </div>
  );
};


export default Checkout;*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.css";
import Button from "../Forms/Button";
import Item from "./Item";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(
    createStructuredSelector({ cartItems: selectCartItems })
  );
  const { total } = useSelector(
    createStructuredSelector({ total: selectCartTotal })
  );
  const errMsg = "You have no items in your cart.";

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
          <>
            {/* טבלת כותרת */}
            <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
            </table>

            {/* טבלת פריטים */}
            <table border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                {cartItems.map((item, pos) => (
                  <tr key={pos}>
                    <td>
                      <Item {...item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* טבלת סיכום */}
            <table align="right" border="0" cellPadding="10" cellSpacing="0">
              <tbody>
                <tr align="right">
                  <td>
                    <h3>Total: ${total}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button onClick={() => navigate(-1)}>
                      Continue Shopping
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => navigate("/payment")}>
                      Checkout
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>{errMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

