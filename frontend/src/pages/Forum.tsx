import { useEffect, useState } from "react";
import AxiosForumService from "../components/AxiosForumService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// Define a more detailed interface for forum posts
interface Course {
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

interface ForumPost {
  forumId: number; // Use 'forumId' to match API response
  title: string; // 'title' property in API response
  forumCreatedAt: string;
  forumUpdatedAt: string;
  course: Course; // Include course details in the interface
}

// Show a list of all forums for the course as well as a form to create a new one (each forum should have a link to its page)
// Use authService to get logged in user's info, use the axios services for http requests
export default function Forum() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchForumPosts() {
      try {
        const data = await AxiosForumService.getAllForums();
        if (data) {
          // Map 'Forum' objects to 'ForumPost' objects
          const mappedData: ForumPost[] = data.map((forum) => ({
            forumId: forum.forumId, // Ensure we use the correct field names
            title: forum.title,
            forumCreatedAt: forum.forumCreatedAt,
            forumUpdatedAt: forum.forumUpdatedAt,
            course: forum.course, // Include course details
          }));
          setForumPosts(mappedData);
        } else {
          console.warn("No forum posts available.");
        }
      } catch (error) {
        console.error("Error fetching forum posts:", error);
      }
    }

    void fetchForumPosts();
  }, []);
  const handleViewDetails = (forumId: number) => {
    // Save forumId to local storage
    localStorage.setItem('selectedForumId', forumId.toString());
    // Redirect to the forum post page
    navigate(`/forumpost`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Forum</h1>
      <h3 className="text-2xl font-semibold mb-6">List of Forum Posts</h3>
      {forumPosts.length > 0 ? (
        <div className="space-y-6 max-w-2xl w-full text-white">
          {forumPosts.map((post) => (
            <div
              key={post.forumId}
              className="bg-neutral rounded-box shadow-md p-6 mb-4 w-full"
            >
              <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
              <p className="mb-1">
                <strong>Course:</strong> {post.course.courseName}
              </p>
              <p className="mb-1">
                <strong>Description:</strong> {post.course.description}
              </p>
              <p className="text-sm mb-1">
                <strong>Created At:</strong>{" "}
                {new Date(post.forumCreatedAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Last Updated:</strong>{" "}
                {new Date(post.forumUpdatedAt).toLocaleString()}
              </p>
                  
              <button className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-btn hover:bg-accent" onClick={() => handleViewDetails(post.forumId)}>
                  View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No forum posts available.</p>
      )}
    </div>
  );
}
