import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { copyPasteContent, deletePaste } from "../redux/pasteSlice";

export default function Paste({ pasteId, title, description }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleEdit() {
        navigate(`/?pasteId=${ pasteId }`)
    }
    function handleDelete() {
        dispatch(deletePaste({ pasteId }));
    }
    function handleView() {
        navigate(`/pastes/${ pasteId }`);
    }
    function handleCopy() {
        dispatch(copyPasteContent({ title, description }));
    }
    return (
        <div className="relative bg-white flex flex-col px-4 py-2 gap-2 rounded-lg">
            <p className="text-xl font-bold">{ title }</p>
            <p>{ description }</p>
            <div className="flex gap-4 bg-slate-400 absolute top-0 right-0 px-4 py-2 rounded-tr-lg rounded-bl-lg">
                <FaRegEdit className="cursor-pointer" onClick={ handleEdit } />
                <MdDeleteOutline className="cursor-pointer" onClick={ handleDelete } />
                <FaRegEye className="cursor-pointer" onClick={ handleView } />
                <FaRegCopy className="cursor-pointer" onClick={ handleCopy } />
            </div>
        </div>
    );
}