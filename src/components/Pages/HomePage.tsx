import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loading from "../Loading";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogContext, Blog } from "../../contexts/MgmtContext";
import defaultImg from "../../assets/default.jpeg";
import catImage from "../../assets/cat-bag.jpg";
import formatDate from "../../functions/DateFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v4 as uuidv4 } from "uuid";
import "../../styles/Fonts.scss";
import DeleteBtn from "../DeleteBtn";

function HomePage() {
	const { tokenActive } = useContext(AuthContext); // we have a verified user (e.g. token is active), show mangement page instead of login/signup
	const { blogs, fetchAllBlogs } = useContext(BlogContext);
	const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

  useEffect(() => {
		setAllBlogs(blogs);
	}, [blogs]);

  // This function is called so we can change the infos in the context. This will cause the "refresh/rerender"
	const refreshBlogs = async () => {
		await fetchAllBlogs();
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-[30px] md:px-[7rem] mt-10">
				{tokenActive ? (
					<div>
						<h1 className="text-4xl text-[#1e81b0] font-bold">Manage Blogs</h1>
						{allBlogs.length > 0 ? (
							<div className="posts-cards-container">
								{blogs.map((blog) => (
									<div className="blog-container flex items-center justify-center md:justify-between w-full border-b border-gray-300 py-4" key={uuidv4()}>
										<Link to={`/blogs/${blog._id}`} className="flex flex-col md:flex-row items-center gap-4">
											<div className="img-container max-h-[250px] md:max-w-[350px] overflow-hidden rounded">
												{/* <img loading="lazy" className="max-h-[300px] object-cover rounded" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} alt="blog image" /> */}
												<LazyLoadImage className="object-cover" alt="blog image" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} />
											</div>
											<div className="texts-container ml-4">
												<div className="flex flex-wrap gap-x-4 header-container">
                          <h1 className="text-xl font-bold">{blog.title}</h1>
                          <div className="cursor-pointer text-[14px] text-[#8d939e] font-medium rounded px-2 py-[1px] border-2 border-[#1ca1ba] hover:border-[#db117d]">
														<DeleteBtn isBlog={true} blogId={blog._id} refreshInfo={refreshBlogs}/>
													</div>
                        </div>
												<p className="date-posted text-gray-500">{formatDate(blog.date_posted)}</p>
												<div className="descriptions text-gray-800 max-w-[75vw] mt-2">
													<Markdown disallowedElements={["a", "h3", "img"]} className="description text-ellipsis line-clamp-3 text-gray-700">
														{blog.content}
													</Markdown>
												</div>
												<ul className="tags-container flex flex-wrap gap-x-5 gap-y-4 mt-4">
													{blog.tags.map((tag) => (
														<li key={uuidv4()} className="bg-gray-800 px-2 py-1 rounded text-white flex justify-center items-center text-center">
															{tag}
														</li>
													))}
												</ul>
											</div>
										</Link>
									</div>
								))}
							</div>
						) : (
							<Loading />
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

export default HomePage;
