import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Paste from "../components/Paste";
import { useState } from "react";

export default function Pastes() {
    const pastes = useSelector(state => state.paste.pastes); 
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    function handleClick() {
        navigate("/");
    }
    const filteredPastes = pastes.filter(paste => {
        if(paste.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return paste;
        }
        if(paste.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return paste;
        }
    });
    return (
        <div>
            <Navbar />
            {
                pastes.length > 0 ? (
                    <div className="flex flex-col gap-4 max-w-[920px] mx-auto bg-slate-200 rounded-lg p-4">
                        <div className="relative">
                            <input type="text" className="px-10 py-2 rounded-lg w-full" placeholder="Search pastes..." value={ searchTerm } onChange={ event => setSearchTerm(event.target.value) } />
                            <FaSearch className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400" />
                        </div>
                        {
                            filteredPastes.map(paste => (
                                <Paste key={ paste.pasteId } pasteId={ paste.pasteId } title={ paste.title } description={ paste.description } />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 max-w-[920px] mx-auto bg-slate-200 rounded-lg p-4">
                        <div className="flex flex-col justify-center gap-2">
                            <p className="text-center">No pastes available to show. Please create a paste.</p>
                            <button className="px-4 py-2 mx-auto bg-slate-400 text-white w-[30%] rounded-lg" onClick={ handleClick }>Create Paste</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}