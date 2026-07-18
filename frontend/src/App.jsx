import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import Menu from "./pages/Menu";
import PrintBill from "./pages/PrintBill";
import Bills from "./pages/Bills";
import BillDetails from "./pages/BillDetails";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/billing" element={<Billing />} />

                    <Route
                        path="/billing/edit/:id"
                        element={<Billing />}
                    />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/menu"
                        element={<Menu />}
                    />

                    <Route
                        path="/bills"
                        element={<Bills />}
                    />

                    <Route
                        path="/bill/:id"
                        element={<BillDetails />}
                    />

                    <Route
                        path="/bill/:id/print"
                        element={<PrintBill />}
                    />

                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;