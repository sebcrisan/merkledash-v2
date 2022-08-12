import React from 'react'
import "./widget.scss"
import GridViewIcon from '@mui/icons-material/GridView';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function Widget() {
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">PROJECT_NAME</span>
            <span><RemoveRedEyeIcon className='icon'/>View Project</span>
            <span className="link"><GridViewIcon className='icon'/>See all projects</span>
        </div>
        <div className="right">
            <div className="percentage"></div>
        </div>
    </div>
  )
}
