import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { format } from "timeago.js";
import "./orders.scss";
import newRequest from "../../utils/newRequest";
function orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  console.log(currentUser.isSeller);
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const mixedId = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${mixedId}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  // Check if the current user has any orders

  const hasOrders = data && data.length > 0;
  const isCurrentUserSeller = currentUser?.isSeller;

  // console.log(hasPlacedOrders);
  return (
    <div className="orders">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error"
      ) : (
        <div className="container">
          <div className="header">
            <h1>Orders</h1>
          </div>
          {(isCurrentUserSeller || hasOrders) && (
            <table>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Product ID</th>
                <th>{isCurrentUserSeller ? "BuyerID" : "Seller"}</th>
                <th>Order Date</th>
                <th>Payment Mode</th>
                <th>Contact</th>
              </tr>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img src={order.img} alt="" className="img" />
                  </td>
                  <td>{order.title}</td>
                  <td>
                    <b>₹ {order.price}</b>
                  </td>
                  <td>{order.gigId}</td>
                  <td>
                    {isCurrentUserSeller ? order.buyerId : order.sellerId}
                  </td>
                  <td>{format(order.createdAt)}</td>
                  <td>{order.payment_intent}</td>
                  <td>
                    <EmailIcon
                      className="mail"
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </table>
          )}
          {!isCurrentUserSeller && !hasOrders && (
            <p>You don't have any orders.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default orders;
