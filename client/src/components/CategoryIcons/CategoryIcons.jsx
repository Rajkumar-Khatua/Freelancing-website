import React from 'react'
import "./CategoryIcons.scss"
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import LocalConvenienceStoreOutlinedIcon from '@mui/icons-material/LocalConvenienceStoreOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import MonochromePhotosOutlinedIcon from '@mui/icons-material/MonochromePhotosOutlined';
export const CategoryIcons = () => {
  return (
    <div className='categoryIcons'>
        <h1>You need it, we've got it</h1>
        <div className="container">
                <div className="icons">
                    <div className="item">
                        <DesignServicesRoundedIcon className='icon'/>
                        Graphics & DesignGraphics
                    </div>
                    <div className="item">
                        <LocalConvenienceStoreOutlinedIcon className='icon'/>
                        Digital Marketing
                    </div>   
                    <div className="item">
                        <BorderColorOutlinedIcon className='icon'/>
                        Writing & Translation
                    </div>   
                    <div className="item">
                        <MusicVideoOutlinedIcon className='icon'/>
                        Video & animation
                    </div>   
                    <div className="item">
                        <KeyboardVoiceOutlinedIcon className='icon'/>
                        Music and Audio
                    </div>   
                    <div className="item">
                        <TerminalOutlinedIcon className='icon'/>
                        Programming & Tech
                    </div>   
                    <div className="item">
                        <BusinessCenterOutlinedIcon className='icon'/>
                        Bushiness
                    </div>   
                    <div className="item">
                        <NightlifeOutlinedIcon className='icon'/>
                        Life Style
                    </div>   
                    <div className="item">
                        <DataThresholdingOutlinedIcon className='icon'/>
                        Data
                    </div>   
                    <div className="item">
                        <MonochromePhotosOutlinedIcon className='icon'/>
                        Photography
                    </div>   

                </div>
        </div>
    </div>
  )
}
