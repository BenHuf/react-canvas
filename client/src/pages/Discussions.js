import React, { useState, useEffect } from "react";
import { getDiscussions as getDiscussionsApi} from '../discussions.js'
import Discussion from '../pages/Discussion'

const Discussions = ({currentUserId}) => {

    const [discussions, setDiscussions] = useState([]);
    console.log(discussions)
    
    const parentDiscussions = discussions.filter(discussions => discussions.parentId === null);

    useEffect(() => {
        getDiscussionsApi()
        .then(data => {
            setDiscussions(data)
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
        <div className="discussions">
            <h3>Discuss Rorschachs</h3>
            <div className="discussions-container">
                {parentDiscussions.map((parentDiscussion) => (
                    <Discussion key={parentDiscussion.id} comment={parentDiscussion}/>
                ))}
            </div>
        </div>
    )
}

export default Discussions