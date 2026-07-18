import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function MainLayout({ children }) {
    return (
        <div className="layout">
            <Sidebar />

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;