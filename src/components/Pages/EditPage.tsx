import { useContext, createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogContext, Blog } from "../../contexts/MgmtContext";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContentInput from "../EditorParts/ContentInput";
import GeneralInput from "../EditorParts/GeneralInput";
import ImageInput from "../EditorParts/ImageInput";
import SubmitBlog from "../EditorParts/SubmitBlog";
import Preview from "../EditorParts/Preview";
import catImage from "../../assets/cat-bag.jpg";
import "../../styles/Editor.scss";

interface IEditorContext {
	title: string;
	readTime: number;
	tags: string[];
	file: File | null;
	imgUrl: string;
	imgSrcName: string;
	imgSrcLink: string;
	content: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setReadTime: React.Dispatch<React.SetStateAction<number>>;
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	setImgSrcName: React.Dispatch<React.SetStateAction<string>>;
	setImgSrcLink: React.Dispatch<React.SetStateAction<string>>;
	setImgUrl: React.Dispatch<React.SetStateAction<string>>;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorContext = createContext<IEditorContext>({
	title: "",
	readTime: 0,
	tags: [],
	file: null,
	imgUrl: "",
	imgSrcName: "",
	imgSrcLink: "",
	content: "",
	setTitle: () => {},
	setReadTime: () => {},
	setTags: () => {},
	setFile: () => {},
	setImgSrcName: () => {},
	setImgSrcLink: () => {},
	setImgUrl: () => {},
	setContent: () => {},
});

function EditPage() {
	const { id } = useParams();
	const { tokenActive } = useContext(AuthContext); // we have a verified user (e.g. token is active), show mangement page instead of login/signup
	const { blogs } = useContext(BlogContext);
	const [editBlog, setEditBlog] = useState<Blog | undefined>(undefined);

	const [activeTab, setActiveTab] = useState("general");
	const [content, setContent] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [readTime, setReadTime] = useState<number>(0);
	const [tags, setTags] = useState<string[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const [imgSrcName, setImgSrcName] = useState<string>("");
	const [imgSrcLink, setImgSrcLink] = useState<string>("");
	const [imgUrl, setImgUrl] = useState<string>("");

	useEffect(() => {
		const blog = blogs.find((blog) => blog._id === id);
		if (blog) {
			setEditBlog(blog);
			setContent(blog.content);
			setTitle(blog.title);
			setReadTime(blog.read_time);
			setTags(blog.tags || []);
			setImgSrcName(blog.blog_img.src.name);
			setImgSrcLink(blog.blog_img.src.link);
			setImgUrl(blog.blog_img.img_url);
		}
	}, [id, blogs]);

	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">
				{tokenActive ? (
					<>
						{editBlog && (
							<EditorContext.Provider value={{ title, readTime, tags, file, imgUrl, imgSrcName, imgSrcLink, content, setTitle, setReadTime, setTags, setFile, setImgUrl, setImgSrcName, setImgSrcLink, setContent }}>
								<div className="flex flex-col md:flex-row gap-5 p-5">
									<div className="info-section">
										<div className="tabs flex gap-2 ml-4 md:ml-8 -mb-[2.5px] font-semibold">
											<button onClick={() => handleTabChange("general")} className={`${activeTab === "general" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
												GENERAL
											</button>
											<button onClick={() => handleTabChange("image")} className={`${activeTab === "image" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
												IMAGE
											</button>
											<button onClick={() => handleTabChange("content")} className={`${activeTab === "content" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
												CONTENT
											</button>
											<button onClick={() => handleTabChange("submit")} className={`${activeTab === "submit" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
												SUBMIT
											</button>
										</div>
										<div className="input-section pt-2 bg-[#f1f5f7] border-2 border-[#f2efee] rounded-l-md rounded-r-md ">{activeTab === "content" ? <ContentInput /> : activeTab === "general" ? <GeneralInput /> : activeTab === "image" ? <ImageInput /> : <SubmitBlog />}</div>
									</div>
									<div className="preview-section w-full md:w-[50vw]">
										<div className="flex justify-center -mb-[2px]">
											<h2 className="py-2 px-4 rounded-t-md text-center bg-[#db117d] border-2 border-2-[#a5adba] text-white font-semibold">Preview</h2>
										</div>
										<Preview />
									</div>
								</div>
							</EditorContext.Provider>
						)}
					</>
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

export default EditPage;
