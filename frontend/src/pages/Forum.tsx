import { useEffect, useState } from "react";
import AxiosForumService from "../components/AxiosForumService";

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

export default function Forum() {
    const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-6">Forum</h1>
            <h3 className="text-2xl font-semibold mb-6">List of Forum Posts</h3>
            {forumPosts.length > 0 ? (
                <div className="space-y-6 max-w-2xl w-full">
                    {forumPosts.map((post) => (
                        <div
                            key={post.forumId}
                            className="bg-white rounded-lg shadow-md p-6 mb-4 w-full"
                        >
                            <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                            <p className="mb-1">
                                <strong>Course:</strong> {post.course.courseName}
                            </p>
                            <p className="mb-1">
                                <strong>Description:</strong> {post.course.description}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <strong>Created At:</strong>{" "}
                                {new Date(post.forumCreatedAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Last Updated:</strong>{" "}
                                {new Date(post.forumUpdatedAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No forum posts available.</p>
            )}
        </div>
    );
}