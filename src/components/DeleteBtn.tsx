import { useContext } from "react";
import { BlogContext } from "../contexts/MgmtContext";
import trashImg from "../assets/trashcan.svg";

interface DeleteBtnProps {
	commentId?: string;
	replyId?: string;
	userId?: string;
	blogId?: string;
	isReply?: boolean;
	isUser?: boolean;
	isBlog?: boolean;
}

function DeleteBtn({ commentId, replyId, isReply, userId, isUser, blogId, isBlog }: DeleteBtnProps) {
	const { fetchAllBlogs, fetchAllComments, fetchAllUsers } = useContext(BlogContext);

	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation(); // prevent parent "Link" from taking us to broken (aka deleted) links
		e.preventDefault();

		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}

			let response;
			if (isReply && replyId) {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}/replies/${replyId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				fetchAllComments(); // refresh comment listing to reflect accurate lists
			} else if (isUser && userId) {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/users/${userId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				// User is deleted (which deletes their comments and blogs). Need to refresh blogs, comments, and user list.
				fetchAllUsers();
				fetchAllBlogs();
				fetchAllComments();
			} else if (isBlog && blogId) {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/posts/${blogId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				// Blog is deleted (meaning all attached comments are deleted too). Need to refresh blog and comment list.
				fetchAllBlogs();
				fetchAllComments();
			} else {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				fetchAllComments();
			}

			/** Checks response results : Failure or success **/
			if (!response.ok) {
				// Handle error
				console.error("Failed to delete info");
			} else {
				const data = await response.json();
				console.log(data.message);
			}
		} catch (error) {
			console.error("An error occurred while deleting the info:", error);
		}
	};
	return (
		<div className="trash flex items-center" onClick={handleDelete}>
			<img className="w-[25px]" src={trashImg} alt="trashcan icon" />
			<p className="text-gray-500 hover:text-[#e7175a]" aria-label="Delete">
				Delete
			</p>
		</div>
	);
}

export default DeleteBtn;
