import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center bg-slate-200 max-w-[920px] mx-auto my-2 px-4 py-2 rounded-lg">
            <NavLink to="/" className="text-2xl">Pastes</NavLink>
            <div className="flex gap-4">
                <NavLink to="/">Create one</NavLink>
                <NavLink to="/pastes">View all</NavLink>
            </div>
        </div>
    );
}