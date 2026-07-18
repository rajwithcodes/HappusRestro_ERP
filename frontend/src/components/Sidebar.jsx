import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="logo">HAPPUS ERP</h2>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/billing">Billing</Link>
                    </li>

                    <li>
                        <Link to="/customers">Customers</Link>
                    </li>

                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/bills">
                            Bills
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;