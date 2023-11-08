import React from "react";
import "./message.scss";
import { Link, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

function message() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  console.log(data);
  return (
    <div className="message">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages </Link> My ID:  {`>`} {currentUser._id}{" "}
            <span>ConversationId: {data.conversationId}</span>
          </span>

          {/* <span style={{marginTop:"10px", fontWeight:"bold"}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat magni error adipisci?</span> */}
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m.id}
              >
                <img src={currentUser.img || "/img/noProfilePic.jpg"} alt="" />
                <p>
                  {m.desc} <span>({moment(m.updatedAt).fromNow()})</span>
                </p>
              </div>
            ))}
          </div>
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <input type="text" placeholder="write a message" />
            <button type="submit">
              {" "}
              <SendIcon className="send" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default message;
