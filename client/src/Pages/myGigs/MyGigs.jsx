import React from "react";
import "./myGigs.scss";
import { Link } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import getCurrentUser from "../../utils/currentUser";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "react-query";
function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  // // console.log(currentUser)
  // console.log(currentUser.id);
  // console.log(data);
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="gigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="header">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add" className="link">
                <button>
                  Add new Gig <AddCircleOutlineRoundedIcon />
                </button>
              </Link>
            )}
          </div>

          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>sales</th>
              <th>Actions</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img src={gig.cover} alt="" className="img" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.cat}</td>
                <td>{gig.sales}</td>
                <td>
                  {" "}
                  <DeleteOutlineRoundedIcon
                    className="delete"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
