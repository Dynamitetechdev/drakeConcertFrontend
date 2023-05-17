import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "web3uikit";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { contractOwner } = ContractFunctions();
  const { account } = useMoralis();
  const [toggleMenu, setToggleMenu] = useState(false);

  const navRoutes = [
    {
      routeLocation: "/",
      routeName: "Tickets",
    },
    {
      routeLocation: "/verifywhitelist",
      routeName: "Verify",
    },
    {
      routeLocation: "/admin",
      routeName: "Admin",
      access: "admin",
    },
  ];
  return (
    <div className="header">
      <header>
        <div className="header-main px-4 md:py-5 text-white flex justify-between bg-color-100 items-center md:absolute md:w-full">
          <Link href="/">
            <h1 className="font-extrabold">ConcertContract</h1>
          </Link>

          <div
            className={
              toggleMenu
                ? "md:flex  md:pt-0 pt-10 w-full md:w-auto mobile"
                : "hidden md:flex"
            }
            id="menu"
          >
            <ul>
              {navRoutes
                .filter((each) =>
                  contractOwner?.toLowerCase() === account?.toLowerCase()
                    ? each.access != ""
                    : each.access != "admin"
                )
                .map((eachLink, index) => (
                  <Link
                    href={eachLink.routeLocation}
                    onClick={() => setToggleMenu(false)}
                    key={index}
                  >
                    <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                      {eachLink.routeName}
                    </li>
                  </Link>
                ))}
            </ul>
            <div className="connectBtn">
              <ConnectButton />
            </div>
          </div>
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <label
              class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
              for="menu-btn"
            >
              <span class="navicon bg-white-darkest flex items-center relative my-1"></span>
              <span class="navicon bg-white-darkest flex items-center relative my-1"></span>
              <span class="navicon bg-white-darkest flex items-center relative my-1"></span>
            </label>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
