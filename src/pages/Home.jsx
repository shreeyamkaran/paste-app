import Navbar from "../components/Navbar";
import { PiTextAaBold } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPaste, updatePaste } from "../redux/pasteSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [searchParam] = useSearchParams();
    const pasteId = searchParam.get("pasteId");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const pastes = useSelector(state => state.paste.pastes);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const paste = pastes.find(paste => paste.pasteId == pasteId);
        if(paste) {
            setTitle(paste.title);
            setDescription(paste.description);
        }
        else {
            setTitle("");
            setDescription("");
        }
    }, [pasteId]);
    function handleClick() {
        if(title == "" || description == "") {
            toast.error("All fields are compulsary");
            return;
        }
        if(pasteId == null) {         
            dispatch(createPaste({ title, description }));
        }
        else {
            dispatch(updatePaste({ pasteId, title, description }));
            navigate("/");
        }
        setTitle("");
        setDescription("");
    }
    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-4 max-w-[920px] mx-auto bg-slate-200 rounded-lg p-4">
                <div className="relative">
                    <input type="text" className="px-10 py-2 rounded-lg w-full" placeholder="Title" value={ title } onChange={ event => setTitle(event.target.value) } />
                    <PiTextAaBold className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400" />
                </div>
                <div className="relative">
                    <textarea className="resize-none h-[400px] px-10 py-2 rounded-lg w-full" placeholder="Description" value={ description } onChange={ event => setDescription(event.target.value) } />
                    <IoReorderThree className="absolute left-4 top-3 text-gray-400" />
                </div>
                <button className="bg-slate-400 w-[30%] mx-auto px-4 py-2 rounded-lg text-white" onClick={ handleClick }>{ pasteId == null ? "Create Paste" : "Update Paste" }</button>
            </div>
        </div>
    );
}