

import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/header/top-header";
import SideHeader from "../components/header/side-header";
import { Toaster } from "react-hot-toast";


const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen bg-gray-100 relative font-poppins">
            {isSidebarOpen && (
                <section
                    className={` bg-slate-50 absolute top-0 left-0 w-[50%] h-full transform transition-transform duration-300  z-50 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <SideHeader closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
                </section>
            )}
            <TopHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main className={`flex h-[calc(100%-5rem)] ${isSidebarOpen ? 'mt-16' : ''}`}>
                <section className={`bg-white w-64 overflow-y-auto  hidden md:block`}>
                    <SideHeader closeSidebar={closeSidebar} />
                </section>
                <section className="overflow-y-auto flex-1 space-y-4 w-11/12 mx-auto py-6 px-4 ">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Layout;