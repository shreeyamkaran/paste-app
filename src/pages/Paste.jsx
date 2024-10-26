import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { copyPasteContent, deletePaste } from "../redux/pasteSlice";

export default function Paste() {
    const { pasteId } = useParams();
    const pastes = useSelector(state => state.paste.pastes);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const paste = pastes.find(paste => paste.pasteId == pasteId);
        setTitle(paste.title);
        setDescription(paste.description);
    }, []);
    function handleCopy() {
        dispatch(copyPasteContent({ title, description }));
    }
    function handleDelete() {
        dispatch(deletePaste({ pasteId }));
        navigate("/pastes");
    }
    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-4 max-w-[920px] mx-auto bg-slate-200 rounded-lg p-4">
                <input type="text" className="px-4 py-2 rounded-lg disabled:bg-gray-100" placeholder="Title" value={ title } disabled />
                <textarea className="resize-none h-[400px] px-4 py-2 rounded-lg disabled:bg-gray-100" placeholder="Description" value={ description } disabled />
                <div className="flex justify-center gap-4">
                    <button className="bg-slate-400 w-[30%] px-4 py-2 rounded-lg text-white" onClick={ handleCopy }>Copy to clipboard</button>
                    <button className="bg-red-400 w-[30%] px-4 py-2 rounded-lg text-white" onClick={ handleDelete }>Delete paste</button>
                </div>
            </div>
        </div>
    );
}