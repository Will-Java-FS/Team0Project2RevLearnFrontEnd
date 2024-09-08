import axios from "./AxiosConfig";
import AuthService from "./AuthService";

// Define the structure of a forum
interface Forum {
  forumId: any;
  title: any;
  forumCreatedAt: any;
  forumUpdatedAt: any;
  course: any;
  id: number;
  forumTitle: string;
  content: string;
  posterId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
}

// Define the structure of a post within a forum
interface ForumPost {
  forumId: number;
  title: string;
  forumCreatedAt: string;
  forumUpdatedAt: string;
  course: {
    course_id: number;
    courseName: string;
    description: string;
    teacherId: number;
    course_created_at: string;
    course_updated_at: string;
  };
  content: string; // additional fields that are part of the response
  posterId: number; // any other fields
}

class AxiosForumService {
  async getAllForums(): Promise<Forum[] | null> {
    try {
      const response = await axios.get<Forum[]>("/forum");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error getting all forums!", error);
    }
    return null;
  }

  async getPostsByForum(forumId: number): Promise<ForumPost[] | null> {
    try {
      const response = await axios.get<ForumPost[]>(`/forums/${forumId}/posts`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting all posts for forum ${forumId}!`, error);
    }
    return null;
  }

  async getForumById(id: number): Promise<Forum | null> {
    try {
      const response = await axios.get<Forum>(`/forums/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting forum ${id}!`, error);
    }
    return null;
  }

  async getPostById(id: number): Promise<ForumPost | null> {
    try {
      const response = await axios.get<ForumPost>(`/forumsposts/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting post ${id}!`, error);
    }
    return null;
  }

  async createForum(
    forumTitle: string,
    content: string,
    courseId: number,
  ): Promise<Forum | null> {
    try {
      const response = await axios.post<Forum>("/forums", {
        forumTitle,
        content,
        posterId: AuthService.loggedInUserId(),
        courseId,
      });
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error("Error on forum creation attempt!", error);
    }
    return null;
  }

  async createPost(
    content: string,
    forumId: number,
  ): Promise<ForumPost | null> {
    try {
      const response = await axios.post<ForumPost>(`/forumpost/${forumId}`, {
        content,
        posterId: AuthService.loggedInUserId(),
        forumId,
      });
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error("Error on post creation attempt!", error);
    }
    return null;
  }

  async updateForum(
    id: number,
    forumTitle: string,
    content: string,
  ): Promise<Forum | null> {
    try {
      const response = await axios.put<Forum>(`/forums/${id}`, {
        forumTitle,
        content,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating forum ${id}!`, error);
    }
    return null;
  }

  async updatePost(id: number, content: string): Promise<ForumPost | null> {
    try {
      const response = await axios.put<ForumPost>(`/forumpost/${id}`, {
        content,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating post ${id}!`, error);
    }
    return null;
  }

  async deleteForum(id: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/forums/${id}`);
      if (response.status === 204) {
        return true;
      }
    } catch (error) {
      console.error(`Error deleting forum ${id}!`, error);
    }
    return false;
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/forumposts/${id}`);
      if (response.status === 204) {
        return true;
      }
    } catch (error) {
      console.error(`Error deleting post ${id}!`, error);
    }
    return false;
  }
}

export default new AxiosForumService();
