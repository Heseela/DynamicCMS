import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./navlinks";
import { RxCross2 } from "react-icons/rx";

type Props = {
  closeSidebar?: () => void;
  isSidebarOpen?: boolean;
};

const SideHeader = ({ closeSidebar, isSidebarOpen }: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="space-y-4 p-4">
      {isSidebarOpen && (
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-2 text-xl text-red-700 hover:bg-gray-100 rounded-full"
        >
          <RxCross2 />
        </button>
      )}

      {menuItems.map((item, index) => (
        <section key={index} className="space-y-2">

          {item.submenu ? (
            <>
              <h2 className="font-poppins font-medium text-primaryColor uppercase">
                {item.title}
              </h2>
              <div className="flex flex-col gap-2">
                {item.submenu.map((subItem, i) => (
                  <Link to={subItem.link} key={i} onClick={closeSidebar}>
                    <div
                      className={`flex items-center w-full hover:bg-blue-50 group hover:text-primaryColor duration-200 transition ease-in-out px-4 py-2 gap-2 ${
                        pathname === subItem.link
                          ? "text-primaryColor font-semibold bg-blue-50"
                          : "text-gray-700"
                      }`}
                    >
                      {subItem.icon && <subItem.icon size={16} />}
                      {subItem.title}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (

            item.link && (
              <div className="flex flex-col gap-2">
                <Link to={item.link} onClick={closeSidebar}>
                  <div
                    className={`flex items-center w-full hover:bg-blue-50 group hover:text-primaryColor duration-200 transition ease-in-out px-4 py-2 gap-2 ${
                      pathname === item.link
                        ? "text-primaryColor font-semibold bg-blue-50"
                        : "text-gray-700"
                    }`}
                  >
                    {item.icon && <item.icon size={16} />}
                    {item.title}
                  </div>
                </Link>
              </div>
            )
          )}
        </section>
      ))}
    </div>
  );
};

export default SideHeader;