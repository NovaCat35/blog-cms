import { useContext } from "react";
import { EditorContext } from "../Pages/EditPage";
import { AuthContext } from "../../contexts/AuthContext";
import defaultImg from "../../assets/cat-bag.jpg";
import formatDate from "../../functions/DateFormatter";
import parse from "html-react-parser";

function Preview() {
	const { title, readTime, tags, imgUrl, imgSrcName, file, content } = useContext(EditorContext);
	const { user } = useContext(AuthContext);
	const fileUrl = file ? URL.createObjectURL(file) : imgUrl; // If new uploaded file, use it! Otherwise use existing saved image url.
	const todayDate = new Date();

	return (
		<div className="preview-display flex flex-col gap-3 bg-white border-2 border-2-[#a5adba] p-3 px-10 rounded-md h-[512px] overflow-auto">
			<h1 className="title leading-tight text-4xl font-bold mt-2 -mb-1">{title}</h1>
			<div className="info-container flex gap-3">
				<div className="left-container w-[50px] h-[50px] rounded-full overflow-hidden">
					<img className="w-full h-full object-cover" src={user.profile_img !== "default" ? user.profile_img : defaultImg} alt="pfp" />
				</div>
				<div className="right-container flex flex-col justify-center">
					<p className="text-base font-semibold">{user.username}</p>
					<div className="flex">
						<p>{readTime} min read</p>
						<span className="mx-2 font-black">&#8226;</span>
						<p>{formatDate(todayDate.toString())}</p>
					</div>
				</div>
			</div>
			<ul className="tags-container flex flex-wrap gap-x-3 gap-y-2">
				{tags.map((tag) => (
					<li key={tag} className="bg-gray-800 px-2 rounded text-sm text-white flex justify-center items-center text-center">
						{tag}
					</li>
				))}
			</ul>
			<img className="object-contain h-[300px] w-full object-cover" src={fileUrl} alt="Selected Image" />
			<p className="text-base font-bold text-gray-700">
				Image from{" "} 
				<a className="text-[#d80a77]" href={imgSrcName} target="_blank" rel="noopener noreferrer">
					{imgSrcName}
				</a>
			</p>
			<p className="content mt-3">{parse(content)}</p>
		</div>
	);
}

export default Preview;
