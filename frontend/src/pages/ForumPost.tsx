import { useEffect, useState } from "react";


export default function ForumPost(){
    const [forumPost, setForumPost] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/forumpost/')  // Need to change the endpoint probably
          .then(response => response.json())
          .then(data => setForumPost(data))
          .catch(error => console.error('Error fetching forum posts:', error));
    }, []);

    return (
        <>
        <h1>Forum Post Title</h1>
        <h3>Username</h3>
        <h3>Lorem ipsem comment</h3>
        </>
    )
}

