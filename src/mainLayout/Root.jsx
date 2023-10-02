import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Root = () => {
    return (
        <div>
            <Header/>
            {/* outlet area */}
            <div className="mx-20">
                <Outlet/>
            </div>
        </div>
    );
};

export default Root;