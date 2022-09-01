import React from "react";
// import { createDiscussion } from "../discussions";
import userIcon from '../images/user-icon.png'

const Discussion = ({discussion, replies}) => {
    // TODO: Handle comment functionality
    // const handleSubmit = (e) => {
    // }

    // TODO: Handle delete functionality
    // const handleDelete = (e) => {
    // }
    // TODO: Add Reply functionality - nested? 
    // const handleReply = (e) => {
    // }

  return (
    <div className="discussion">
      <div className="discussion-image-container">
        <img src={userIcon} className="user-icon" alt="user-icon"/>
        <div className="discussion-right-part">
          <div className="discussion-content">
            <div className="discussion-author">{discussion.username}</div>
            <div>{discussion.createdAt}</div>
          </div>
          <div className="comment-text">{discussion.body}</div>
          {replies.length > 0 && (
            <div className="replies">
              {replies.map(reply => (
                <Discussion discussion={reply} key={reply.id} replies={[]}/>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default Discussion