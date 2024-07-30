import { useContext } from "react";
import { BlogContext } from "../../contexts/MgmtContext";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import catImage from "../../assets/cat-bag.jpg";

function EditPage() {
	const { tokenActive } = useContext(AuthContext); // we have a verified user (e.g. token is active), show mangement page instead of login/signup
	const { blogs } = useContext(BlogContext);
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-[30px] md:px-[7rem] mt-10">
				{tokenActive ? (
					<div>{blogs[0].title}</div>
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
