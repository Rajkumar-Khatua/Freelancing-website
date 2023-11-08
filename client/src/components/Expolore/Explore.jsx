import React from 'react'
import "./Expolre.scss"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
function Explore() {
  return (
    <div className='explore'>
        <div className="container">
        <div className="item">
        <h1>The best part? Everything. <FiberNewOutlinedIcon className='NewIcon'/></h1>
          <div className="title">
           <h2> A solution built for business</h2>
          </div>
          <p>
          Upgrade to a curated experience to access vetted talent and exclusive tools
          </p>
          <div className="title">
          <CheckCircleOutlineIcon className="BatchIcon"/>

            Talent matching

          </div>
        
          <div className="title">
          <CheckCircleOutlineIcon className="BatchIcon"/>

            Dedicated account management

          </div>
         
          <div className="title">
          <CheckCircleOutlineIcon className="BatchIcon"/>

            Team collaboration tools

          </div>
        
          <div className="title">
          <CheckCircleOutlineIcon className="BatchIcon"/>

           Business payment solutions

          </div>
          <button className='btn'>Explore Reseller</button>      
        </div>
        <div className="item">
            <img src="../../../public/img/explore.jpg"></img>
        </div>
      </div>

    </div>
  )
}

export default Explore