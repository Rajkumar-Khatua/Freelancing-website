import Navbar from "./components/Navbar/Navbar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./app.scss";
import Home from "./Pages/home/Home";
import Categories from "./Pages/categorys/Categories";
import Single from "./Pages/single/Single";
import Orders from "./Pages/orders/Orders";
import MyGigs from "./Pages/myGigs/MyGigs";
import AddNew from "./Pages/add_New/Add_New";
import Messages from "./Pages/Messages/Messages";
import Message from "./Pages/message/Message";
import Footer from "./components/Footer/Footer";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Payment from "./Pages/Payment/Payment";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess";
import Profile from "./Pages/profile/Profile";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/single/:id",
          element: <Single />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <AddNew />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/pay/:id",
          element: <Payment />,
        },
        {
          path: "/success",
          element: <PaymentSuccess />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
