import { useContext } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogContext } from "../../contexts/BlogContext";
import formatDate from "../../functions/DateFormatter";
import "../../styles/Fonts.scss";
import catImage from "../../assets/cat-bag.jpg";
import defaultImg from "../../assets/default.jpeg";

function UsersPage() {
	const { tokenActive } = useContext(AuthContext); // We have a verified user (e.g. token is active), show management page instead of login/signup
	const { allUsers } = useContext(BlogContext);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-[30px] md:px-[7rem] mt-10">
				{tokenActive ? (
					<div>
						<h1 className="text-4xl text-[#1e81b0] font-bold mb-4">Manage Users</h1>
						{allUsers.length > 0 ? (
							allUsers.map((user) => (
								<div key={user._id} className="w-full mb-4">
									<div className="top-container flex gap-5 mt-2 mb-2">
										<div className="user-profile">
											<Link to={`/users/${user._id}`} className="font-semibold">{user.username}</Link>
											<div className="img-container w-[60px] h-[60px] rounded-full overflow-hidden">
												<Link to={`/users/${user._id}`}>
													<img className="w-full h-full object-fit" src={user.profile_img !== "default" ? user.profile_img : defaultImg} alt="user pfp" />
												</Link>
											</div>
										</div>
										<div className="user-info">
											<div>Date Joined: <span className="text-[#105581]">{formatDate(user.date_joined)}</span></div>
											<div>Email: <span className="text-[#105581]">{user.email}</span></div>
											<div>Role: <span className={`${user.admin_access ? 'text-[#d81178]' : 'text-[#00adb3]'} font-medium`}>{user.admin_access ? 'Admin' : 'Reader'}</span></div>
										</div>
									</div>
									<span className="flex mt-2 mb-4 w-full border border-[#1ca1ba]"></span>
								</div>
							))
						) : (
							<div className="mt-4 mb-4">
								<p className="mt-2">No user to display.</p>
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

export default UsersPage;
