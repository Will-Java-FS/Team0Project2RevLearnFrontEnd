import { useEffect, useState } from "react";
import AxiosForumService from "../components/AxiosForumService"; // Adjust the import path as needed

interface Course {
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

interface forum {
  forumId: number;
  title: string;
  forumCreatedAt: string;
  forumUpdatedAt: string;
  course: Course;
}

interface user {
  userId: number;
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  userCreatedAt: string;
  role: string;
  userUpdatedAt: string;
  program: {
    programId: number;
    programName: string;
  };
}

interface ForumPostData {
  forumpost_id: number;
  post_text: string;
  post_created_at: string;
  post_updated_at: string;
  Forum: forum;
  user: user;
}

export default function ForumPost() {
  const [forumPosts, setForumPosts] = useState<ForumPostData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevforumid = Number(localStorage.getItem('selectedForumId'));

  useEffect(() => {
    async function fetchForumPosts() {
      try {
        setLoading(true);
        setError(null);
        // Make sure AxiosForumService.getPostsById returns an array of ForumPostData
        const data = await AxiosForumService.getPostsById(prevforumid);
        if (Array.isArray(data)) {
          setForumPosts(data);
        } else {
          setError("Unexpected data format received.");
        }
      } catch (error) {
        setError("Error fetching forum post data.");
        console.error("Error fetching forum posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForumPosts();
  }, [prevforumid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!forumPosts || forumPosts.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      {forumPosts.map(post => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full" key={post.forumpost_id}>
          
          <p><strong>Post:</strong> {post.post_text}</p>
          <p className="text-sm text-gray-500"><strong>Created At:</strong> {new Date(post.post_created_at).toLocaleString()}</p>
          <p className="text-sm text-gray-500"><strong>Last Updated:</strong> {new Date(post.post_updated_at).toLocaleString()}</p>
          {post.user ? (
            <>
              <p><strong>Posted By:</strong> {post.user.username} (Email: {post.user.email})</p>
              <p><strong>User Role:</strong> {post.user.role}</p>
            </>
          ) : (
            <p>User information not available.</p>)}
        </div>
      ))}
    </div>
  );
}
