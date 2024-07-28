import { useState, useEffect, createContext } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profile_img: string;
  date_joined: string;
  admin_access: boolean;
};

export type Comment = {
  _id: string;
  user: User;
  text: string;
  likes: string[];
  date_posted: string; // Date turn to string with .json()
  blog_post: {
    _id: string;
    title: string;
  };
  replies: Comment[]; // Array of Object IDs of reply comments
  edited: boolean;
};

export type Blog = {
  _id: string;
  tags: string[];
  read_time: number;
  date_posted: string; // Date turn to string with .json()
  title: string;
  content: string;
  blog_img: {
    img_url: string;
    src: {
      name: string;
      link: string;
    };
  };
  author: User;
  comments: string[];
  published: boolean;
  likes: number;
};

// Specify the type for the context value explicitly
type BlogContextType = {
  blogs: Blog[];
  allComments: Comment[];
  allUsers: User[];
  fetchComments: (id: string) => Promise<Comment[]>;
  fetchAllComments: () => Promise<void>;
};

export const BlogContext = createContext<BlogContextType>({
  blogs: [],
  allComments: [],
  allUsers: [],
  fetchComments: async () => {
    throw new Error("fetchComments function not implemented");
  },
  fetchAllComments: async () => {
    throw new Error("fetchAllComments function not implemented");
  },
});

function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://wayfarers-frontier-api.fly.dev/posts/", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const blogs = await response.json();
        setBlogs(blogs.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBlogs();
  }, []);

  const fetchAllComments = async () => {
    try {
      const response = await fetch("https://wayfarers-frontier-api.fly.dev/comments/", {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setAllComments(result.commentList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          throw new Error("JWT token not found");
        }

        const response = await fetch("https://wayfarers-frontier-api.fly.dev/users/", {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setAllUsers(result.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllUsers();
  }, []);

  const fetchComments = async (id: string) => {
    try {
      const response = await fetch(`https://wayfarers-frontier-api.fly.dev/posts/${id}/comments`, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const comments = await response.json();
      return comments.commentList;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, allComments, allUsers, fetchComments, fetchAllComments }}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogProvider;
