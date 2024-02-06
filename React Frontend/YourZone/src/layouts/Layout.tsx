import { Outlet } from "react-router-dom";

// Outlet represents all the children of the layout
const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    );
};

export default Layout;