import { useNavigate } from "react-router-dom";
import editSvg from "../assets/edit.svg";

interface EditBtnProps {
	blogId: string;
}

function EditBtn({ blogId }: EditBtnProps) {
	const navigate = useNavigate();

	const handleEdit = async (e: React.MouseEvent) => {
		e.stopPropagation(); // prevent parent "Link" from taking us to other links
		e.preventDefault();
		navigate(`/edit/${blogId}`);
	};

	return (
		<div onClick={handleEdit} className="cursor-pointer text-[14px] text-[#8d939e] font-medium rounded px-2 py-[1px] border-2 border-[#1ca1ba] hover:border-[#db117d]">
			<div className="trash flex items-center">
				<img className="w-[25px]" src={editSvg} alt="trashcan icon" />
				<p className="text-gray-500 hover:text-[#e7175a] ml-1" aria-label="Delete">
					Edit
				</p>
			</div>
		</div>
	);
}

export default EditBtn;
