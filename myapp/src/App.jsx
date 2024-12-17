import React, { useEffect, createContext, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import "./default.css";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";

//components
import AdminToolBar from "./components/AdminToolBar";

// HOC
import WithAuth from "./hoc/withAuth";
import WithAdmitAuth from "./hoc/withAdmitAuth";

// Layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";

// Pages
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

const UserContext = createContext(null);

const App = () => {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  /* useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const userData = {
            id: snapshot.id,
            ...snapshot.data(),
            createdDate: snapshot.data().createdDate?.toDate() || null,
          };
          dispatch(setReduxCurrentUser(userData));

          // נווט לדף הבית אם המשתמש מחובר והנתיב הנוכחי הוא דף ההתחברות או ההרשמה
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/registration"
          ) {
            navigate("/");
          }
        }
      } else {
        dispatch(setReduxCurrentUser(null));
        // אין צורך לבצע ניתוב אם אין משתמש מחובר
      }
    });

    return () => authListener();
  }, [navigate, dispatch]);  */

  return (
    <UserContext.Provider value={null}>
      <div className="App">
        <AdminToolBar />
        <Routes>
          <Route
            path="/"
            element={
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path="/search"
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
          <Route
            path="/search/:filterType"
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
          <Route
            path="/product/:productID"
            element={
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <WithAuth>
                <MainLayout>
                  <Payment />
                </MainLayout>
              </WithAuth>
            }
          />
          <Route
            path="/registration"
            element={
              <MainLayout>
                <Registration />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/recovery"
            element={
              <MainLayout>
                <Recovery />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <WithAuth>
                <DashBoardLayout>
                  <Dashboard />
                </DashBoardLayout>
              </WithAuth>
            }
          />
          <Route
            path="/order/:orderID"
            element={
              <WithAuth>
                <DashBoardLayout>
                  <Order />
                </DashBoardLayout>
              </WithAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <WithAdmitAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdmitAuth>
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default App;
