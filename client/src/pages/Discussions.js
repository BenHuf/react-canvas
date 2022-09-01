import React, { useState, useEffect } from "react";
import { getComments as getCommentsApi} from '../comments.js'

const Discussions = ({currentUserId}) => {

    const [comments, setComments] = useState([]);
    console.log(comments)
    
    const parentComments = comments.filter(comments => comments.parentId === null);

    useEffect(() => {
        getCommentsApi()
        .then(data => {
            setComments(data)
        })
    }, [])
    // TODO: Handle comment functionality
    const handleSubmit = (e) => {
    }

    // TODO: Handle delete functionality
    const handleDelete = (e) => {
    }
    // TODO: Add Reply functionality - nested? 
    // const handleReply = (e) => {
    // }

    return (
        <div className="comments">
            <h3 className="comments-title">Discuss Rorshachs</h3>
            <div className="comments-container">
                {parentComments.map((parentComment) => (
                    <div key={parentComment.id}>{parentComment.body}</div>
                ))}
            </div>
        </div>
    )
}

export default Discussions