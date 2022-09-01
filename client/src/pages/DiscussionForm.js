import React, { useState } from "react";

const DiscussionForm = (handleSubmit) => {

    const [text, setText] = useState("");

    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(text)
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea 
                className="discussion-form-textarea" 
                value={text} 
                onChange={(e) => setText(e.target.value)}/>
            <button className="discussion-form-button">Write</button>
        </form>
    )
}

export default DiscussionForm