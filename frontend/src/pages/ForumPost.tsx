import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosForumService from "../components/AxiosForumService"; // Adjust the import path as needed
import AuthService from "../components/AuthService";

interface Course {
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

interface Forum {
  forumId: number;
  title: string;
  forumCreatedAt: string;
  forumUpdatedAt: string;
  course: Course;
}

interface User {
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
  Forum: Forum;
  user: User;
}
function CreatePostForm({
  userId,
  forumId,
  onPostCreated,
}: {
  userId: number;
  forumId: number;
  onPostCreated: () => void;
}) {
  const [post_text, setPostText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePostTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setPostText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!post_text.trim()) {
      setError("Post content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const result = await AxiosForumService.createPost(
        post_text,
        forumId,
        userId,
      );
      if (result) {
        setSuccess("Post submitted successfully!");
        setPostText(""); // Clear the input field
        onPostCreated(); // Call the function passed as a prop
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (error) {
      setError("Error submitting the post. Please try again.");
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral text-white rounded-box shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={post_text}
          onChange={handlePostTextChange}
          placeholder="Write your post here..."
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-badge"
          required
        />
        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-btn hover:bg-primary ${loading ? "bg-gray-400" : "bg-accent"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </form>
    </div>
  );
}

export default function ForumPost() {
  const navigate = useNavigate();
  const [forumPosts, setForumPosts] = useState<ForumPostData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Assuming you have a way to get the logged-in user
  const prevforumid = Number(localStorage.getItem("selectedForumId"));
  console.log(prevforumid);

  useEffect(() => {
    async function fetchForumPosts() {
      try {
        setLoading(true);
        setError(null);
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

  // Assuming you have a way to get the logged-in user ID
  const loggedInUserId = AuthService.getLoggedInUserId() || 1;

  // Function to refresh the forum posts
  async function fetchForumPosts() {
    try {
      setLoading(true);
      setError(null);
      const data = await AxiosForumService.getPostsById(1);
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
    <div className="p-10">
      <button
        className="min-h-10 w-full bg-primary hover:bg-accent text-white rounded-btn btn-active"
        onClick={() => navigate(-1)}
      >
        Back To Fourms
      </button>
      <br />
      <br />
      {forumPosts.map((post) => (
        <div
          className="bg-neutral rounded-box text-white shadow-md p-5 mb-4 w-full"
          key={post.forumpost_id}
        >
          <p>
            <strong>Post:</strong> {post.post_text}
          </p>
          <p className="text-sm">
            <strong>Created At:</strong>{" "}
            {new Date(post.post_created_at).toLocaleString()}
          </p>
          <p className="text-sm">
            <strong>Last Updated:</strong>{" "}
            {new Date(post.post_updated_at).toLocaleString()}
          </p>
          {post.user ? (
            <>
              <p>
                <strong>Posted By:</strong> {post.user.username} (Email:{" "}
                {post.user.email})
              </p>
              <p>
                <strong>User Role:</strong> {post.user.role}
              </p>
            </>
          ) : (
            <p>User information not available.</p>
          )}
        </div>
      ))}
      <br />
      <CreatePostForm
        userId={loggedInUserId}
        forumId={prevforumid}
        onPostCreated={fetchForumPosts}
      />
    </div>
  );
}
