import trashImg from "../assets/trashcan.svg";

interface DeleteBtnProps {
	commentId?: string;
	replyId?: string;
	userId?: string;
	blogId?: string;
	isReply?: boolean;
	isUser?: boolean;
	isBlog?: boolean;
	refreshInfo: () => void;
}

function DeleteBtn({ commentId, replyId, isReply, refreshInfo, userId, isUser, blogId, isBlog }: DeleteBtnProps) {
	const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation(); // Prevents the click event from bubbling up to parent "Link" elements (if applicable)

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
			} else if (isUser && userId) {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/users/${userId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			} else if (isBlog && blogId) {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/posts/${blogId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			} else {
				response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}`, {
					mode: "cors",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			}

			if (!response.ok) {
				// Handle error
				console.error("Failed to delete info");
			} else {
				refreshInfo();
				const data = await response.json();
				console.log(data.message);
			}
		} catch (error) {
			console.error("An error occurred while deleting the info:", error);
		}
	};
	return (
		<div className="trash flex items-center">
			<img className="w-[25px]" src={trashImg} alt="trashcan icon" />
			<button className="text-gray-500 hover:text-[#e7175a]" onClick={handleDelete} aria-label="Delete">
				Delete
			</button>
		</div>
	);
}

export default DeleteBtn;
