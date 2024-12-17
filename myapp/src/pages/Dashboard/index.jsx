import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import OrderHistory from "../../components/OrderHistory";
import "./styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const orderHistory = useSelector(
    (state) => state.ordersData.orderHistory.data
  );

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  
  return (
    <div>
      <h1>Order History</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;
