import { useState } from "react";


export default function Forum(){
    const [forumPostTitle, setForumPostTitle] = useState<string>([]);

    return (
        <>
        <h1>Forum Post Title</h1>
        <h3>Username</h3>
        <h3>Lorem ipsem comment</h3>
        </>
    )
}

