import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

import { Globe, LogOut, UserRound } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
    toggleSidebar?: () => void;
    isSidebarOpen?: boolean
}

const TopHeader = ({ toggleSidebar, isSidebarOpen }: Props) => {
    return (
        <div className="sticky top-0 left-0 right-0 shadow-lg border bg-white p-4 z-10 flex justify-between items-center">

            <Link to="/" className="flex items-center space-x-6">
                <img src="/logo1.png" alt="LOGO" className="h-14 w-14" />
                <img src="/logo2.jpeg" alt="LOGO" className="h-14 w-14" />
            </Link>

            {!isSidebarOpen ? (
                <span onClick={toggleSidebar} className="md:hidden p-4 text-2xl text-primaryColor hover:bg-gray-100 rounded-full">
                    <IoMenu />
                </span>
            ) : (
                <span onClick={toggleSidebar} className="md:hidden p-2 hover:bg-gray-100 text-2xl rounded-md">
                    <IoMenu />
                </span>
            )}

            <section className="flex gap-4 font font-semibold items-center justify-center px-4">

                <a
                    href='https://university.e-aribt.com/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:shadow-md hover:text-blue-700 rounded-md text-primaryColor duration-200 transition ease-in-out border px-4 py-2 flex gap-2"
                >
                    <Globe /> <span>Visit Site</span>
                </a>

                <DropdownMenu>
                    <DropdownMenuTrigger className=" font-semibold bg-white rounded-md hover:text-blue-700 text-primaryColor px-4 py-2">
                        <div className="hover:shadow-md hover:text-blue-700 rounded-md text-primaryColor duration-200 transition ease-in-out border px-4 py-2 flex gap-2">
                            <UserRound />
                            <span>University</span>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white">
                        <DropdownMenuLabel className="hover:bg-blue-50 rounded-md cursor-pointer">
                            <Link to={'/general-setting'}>Setting</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel className="hover:bg-blue-50 rounded-md cursor-pointer">
                            <Link to={'/change-password'}>Change Password</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer flex gap-2 font-semibold items-center">
                            <span>Log Out</span>
                            <LogOut size={14} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </section>

        </div>
    );
};

export default TopHeader;
