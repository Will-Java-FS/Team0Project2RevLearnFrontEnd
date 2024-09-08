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

interface ForumPostData {
  forumId: number;
  title: string;
  forumCreatedAt: string;
  forumUpdatedAt: string;
  course: Course;
}

// Show the fourm info + all posts for the forum
// Give the forums owner option to delete/edit the forum
// Have a form to create a new forum post
// Allow users to edit/delete posts they own
// Give teachers the ability to delete the forum and any of the fourm posts
// Use authService to get logged in user's info, use the axios services for http requests
export default function ForumPost() {
  const [forumPost, setForumPost] = useState<ForumPostData | null>(null);

  useEffect(() => {
    async function fetchForumPost() {
      try {
        const data = await AxiosForumService.getPostById(1); // Replace `1` with the actual forum post ID
        if (data) {
          // Transform the data if needed to match the ForumPostData structure
          const transformedData: ForumPostData = {
            forumId: data.forumId,
            title: data.title,
            forumCreatedAt: data.forumCreatedAt,
            forumUpdatedAt: data.forumUpdatedAt,
            course: data.course, // assuming course structure matches
          };
          setForumPost(transformedData);
        } else {
          console.warn("No forum post data available.");
        }
      } catch (error) {
        console.error("Error fetching forum post:", error);
      }
    }

    void fetchForumPost();
  }, []);

  if (!forumPost) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{forumPost.title}</h1>
      <h3>Course: {forumPost.course.courseName}</h3>
      <p>
        <strong>Description:</strong> {forumPost.course.description}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(forumPost.forumCreatedAt).toLocaleString()}
      </p>
      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(forumPost.forumUpdatedAt).toLocaleString()}
      </p>
    </>
  );
}
