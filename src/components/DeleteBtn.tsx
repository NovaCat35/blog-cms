import trashImg from "../assets/trashcan.svg";

interface DeleteBtnProps {
	commentId: string;
	replyId?: string;
	isReply: boolean;
	refreshComments: () => void;
}

function DeleteBtn({ commentId, replyId, isReply, refreshComments }: DeleteBtnProps) {
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
				console.error("Failed to delete comment");
			} else {
				refreshComments();
				const data = await response.json();
				console.log(data.message);
			}
		} catch (error) {
			console.error("An error occurred while deleting the comment:", error);
		}
	};
	return (
		<div className="trash flex items-center">
			<img className="w-[25px]" src={trashImg} alt="trashcan icon" />
			<p className="text-gray-500 hover:text-[#e7175a]" onClick={handleDelete}>
				Delete
			</p>
		</div>
	);
}

export default DeleteBtn;