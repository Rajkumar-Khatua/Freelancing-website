import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "./messages.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";
import { Comment } from "react-loader-spinner";
import moment from "moment";
import { Alert, AlertTitle } from "@mui/material";
function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{
            width: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "220px",
          }}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#0d0d0e"
        />
      ) : error ? (
        <Alert
          severity="error"
          style={{ marginTop: "220px", color: "red", border: "1px solid red" }}
        >
          <AlertTitle>Error</AlertTitle>
          <strong>Something went wrong follow try this steps</strong>
          <ul>
            <i>
              <li>Logout and re-login again</li>
              <li>Refresh the page</li>
              <li>Make sure your internet connected</li>
            </i>
          </ul>

          <strong style={{ color: "green" }}>
            We hope problem will be resolved!
          </strong>
        </Alert>
      ) : (
        <div className="container">
          <div className="header">
            <h1>Messages</h1>
          </div>

          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer ID" : "Seller ID"}</th>
              <th>Last Message</th>
              <th>Date/ Time</th>
              <th>Action</th>
            </tr>
            {data.map((conver) => (
              <tr
                className={
                  (currentUser.isSeller && !conver.readBySeller) ||
                  (!currentUser.isSeller && !conver.readByBuyer && "active")
                }
                key={conver.id}
              >
                {/* <td>Jhon Doe</td> instead of creating seller name we can pass seller or buyerID */}
                <td>
                  {currentUser.isSeller ? conver.buyerId : conver.sellerId}
                </td>
                <td>
                  <Link to={`/message/${conver.id}`} className="link">
                    {conver?.lastMessage?.substring(0, 80)}...
                  </Link>
                </td>
                <td>{moment(conver.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !conver.readBySeller) ||
                    (!currentUser.isSeller && !conver.readByBuyer)) && (
                    <button onClick={() => handleRead(conver.id)}>
                      Mark as Read <DoneAllIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default Messages;
