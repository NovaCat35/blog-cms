import { useContext, useState } from "react";
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
	const [showModal, setShowModal] = useState(false);

	const handleDelete = async () => {
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

	const handleClickDelete = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handlePreventLink = (e: React.MouseEvent) => {
		e.stopPropagation(); // prevent parent "Link" from taking us to broken (aka deleted) links
		e.preventDefault();
	};

	return (
		<div onClick={handlePreventLink}>
			<div onClick={handleClickDelete} className="cursor-pointer text-[14px] text-[#8d939e] font-medium rounded px-2 py-[1px] border-2 border-[#1ca1ba] hover:border-[#db117d]">
				<div className="trash flex items-center">
					<img className="w-[25px]" src={trashImg} alt="trashcan icon" />
					<p className="text-gray-500 hover:text-[#e7175a]" aria-label="Delete">
						Delete
					</p>
				</div>
			</div>

			{showModal && (
				<div className="modal-container fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-cover absolute inset-0 bg-black opacity-50"></div>
					<div className="relative bg-white p-4 rounded-md shadow-lg border-4 border-[#138ed3]">
						<h2 className="text-lg mb-4">Confirm Deletion</h2>
						<p>Are you sure you want to delete this item?</p>
						<div className="mt-4 flex justify-end space-x-2">
							<button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded transition duration-300 ease-in-out hover:bg-[#89a02c] hover:text-white">
								Cancel
							</button>
							<button onClick={handleDelete} className="px-4 py-2 bg-[#e7175a] text-white rounded transition duration-300 ease-in-out hover:bg-[#d81178]">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default DeleteBtn;
