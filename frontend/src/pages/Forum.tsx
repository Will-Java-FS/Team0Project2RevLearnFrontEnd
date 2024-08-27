import { useState } from "react";


export default function Forum(){
    const [forumPostTitles, setForumPostTitles] = useState<string[]>([]);

    return (
        <>
        <h1>Forum</h1>
        <h3>List of Forum Posts</h3>
        </>
    )
}

