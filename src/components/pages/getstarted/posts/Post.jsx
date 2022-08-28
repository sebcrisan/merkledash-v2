import React from 'react'
import "./post.scss";

export const Post = (props) => {
  const {id, headingContent} = props;
  return (
    <>
      <div className={"postHeading"} id={id}>
        {headingContent}
      </div>
      <div className="postContent">
        {props.children}
      </div>
    </>  

  )
}
