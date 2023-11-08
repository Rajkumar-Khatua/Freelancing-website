import React from 'react'
import "./CatCard.scss"
import {Link} from "react-router-dom"
import { useQuery } from 'react-query';
import newRequest from '../../utils/newRequest';
function CatCard({item}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => {
        return res.data;
      }),
  });
  // console.log(data)
   const catQuery = `cat=${item.title.toLowerCase()}`;
  return (
    <div className='catCard'>
     <Link to={`/categories?${catQuery}`} className='link'>
        <img src={item.img} alt="" />
        <span className='desc'> {item.desc} </span>
        <span className="title">{item.title}</span>
      </Link>
    </div>
  )
}

export default CatCard