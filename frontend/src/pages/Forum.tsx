import { useEffect, useState } from "react";


export default function Forum(){
    const [forumPosts, setForumPosts] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/forums/')  // Need to change the endpoint probably
          .then(response => response.json())
          .then(data => setForumPosts(data))
          .catch(error => console.error('Error fetching forum posts:', error));
    }, []);


    return (
        <>
        <h1>Forum</h1>
        <h3>List of Forum Posts</h3>
        </>
    )
}

