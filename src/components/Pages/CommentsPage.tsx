import { useContext} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogContext } from "../../contexts/MgmtContext";
import "../../styles/Fonts.scss";
import catImage from "../../assets/cat-bag.jpg";
import heartSvg from "../../assets/heart.svg";
import defaultImg from "../../assets/default.jpeg";
import "../../styles/Comment.scss";
import DeleteBtn from "../DeleteBtn";

function CommentPage() {
	const { tokenActive } = useContext(AuthContext); // We have a verified user (e.g. token is active), show management page instead of login/signup
	const { allComments } = useContext(BlogContext);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-[30px] md:px-[7rem] mt-10">
				{tokenActive ? (
					<div>
						<h1 className="text-4xl text-[#1e81b0] font-bold mb-4">Manage Comments</h1>
						{allComments.length > 0 ? (
							allComments.map((comment) => (
								<div key={comment._id} className="w-full mb-4">
									<div className="top-container flex gap-5 mt-2 mb-2">
										<div className="user-info">
											<Link to={`/users/${comment.user._id}`} className="font-semibold">
												{comment.user.username}
											</Link>
											<div className="img-container w-[60px] h-[60px] rounded-full overflow-hidden">
												<Link to={`/users/${comment.user._id}`}>
													<img className="w-full h-full object-fit" src={comment.user.profile_img !== "default" ? comment.user.profile_img : defaultImg} alt="comment pfp" />
												</Link>
											</div>
										</div>
										<div className="main-comment-info">
											<Link to={`/blogs/${comment.blog_post._id}`} className="font-medium text-[#105580] underline">
												{comment.blog_post.title}
											</Link>
											<p className="mb-2">{comment.text}</p>
										</div>
									</div>
									<div className="bottom-container flex gap-4">
										<div className="flex gap-2 items-center">
											<img src={heartSvg} className="heart w-[30px] fill-cyan-500" alt="heart icon" />
											<p>{comment.likes.length}</p>
											<span>•</span>
											<p>
												Date: <span className="font-medium text-[#006eb1]">{new Date(comment.date_posted).toLocaleDateString()}</span>
											</p>
											<div className="ml-4">
												<DeleteBtn commentId={comment._id} isReply={false} />
											</div>
										</div>
									</div>
									{/* Render replies if they exist */}
									{comment.replies && comment.replies.length > 0 && (
										<div className="replies-container mt-4 pl-8">
											<h3 className="font-bold mb-2 bg-[#1ca1ba] text-white pl-2">Replies:</h3>
											{comment.replies.map((reply, index) => (
												<div key={reply._id} className="reply mb-4 bg-[#f6f8fa]">
													<div className="top-container flex gap-5 mb-2">
														<div className="user-info">
															<Link to={`/users/${reply.user._id}`} className="font-semibold">
																{reply.user.username}
															</Link>
															<div className="img-container w-[40px] h-[40px] rounded-full overflow-hidden">
																<Link to={`/users/${reply.user._id}`}>
																	<img className="w-full h-full object-fit" src={reply.user.profile_img !== "default" ? reply.user.profile_img : defaultImg} alt="reply pfp" />
																</Link>
															</div>
														</div>
														<div className="main-comment-info mt-8">
															<p className="mb-2">{reply.text}</p>
														</div>
													</div>
													<div className="bottom-container flex gap-4">
														<div className="flex gap-2 items-center">
															<img src={heartSvg} className="heart w-[20px] fill-cyan-500" alt="heart icon" />
															<p>{reply.likes.length}</p>
															<span>•</span>
															<p>
																Date: <span className="font-medium text-[#006eb1]">{new Date(reply.date_posted).toLocaleDateString()}</span>
															</p>
															<div className="ml-4">
																<DeleteBtn commentId={comment._id} replyId={reply._id} isReply={true} />
															</div>
														</div>
													</div>
													{index < comment.replies.length - 1 && <span className="flex mt-2 mb-4 w-full border border-[#bfdeef]"></span>}
												</div>
											))}
										</div>
									)}
									<span className="flex mt-2 mb-4 w-full border border-[#1ca1ba]"></span>
								</div>
							))
						) : (
							<div className="mt-4 mb-4">
								<p className="mt-2">No comments to display.</p>
							</div>
						)}
					</div>
				) : (
					<div className="flex flex-col items-center mb-8">
						<h1 className="text-xl">Your session has expired. Please sign-in again.</h1>
						<img className="max-w-sm mt-8 object-cover rounded-lg" src={catImage} alt="cat in bag" />
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default CommentPage;
