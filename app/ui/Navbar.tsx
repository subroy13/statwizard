"use client";

import Image from "next/image";
import { MAIN_MENU, SOCIAL_MENU } from "../constants";
import { CustomIcon } from "./CustomIcon";
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();
    return (
        <nav className="bg-white shadow-xl z-50">
            {/* Big screen menu */}
            <div className="hidden md:flex w-full py-2 px-4 md:px-6 lg:px-8 md:flex flex-row items-center justify-between">
                {/* Main menu */}
                <div className="flex flex-row justify-start items-center gap-4">
                    {
                        MAIN_MENU.map((menu) => (
                            <Link
                                key={menu.name}
                                href={menu.route}
                                className={`px-4 py-2 box-border rounded-t-lg hover:bg-gray-100 hover:border-b-2 hover:border-blue-600 hover:text-blue-600 roboto-medium ${menu.route === pathname ? `bg-gray-100 border-b-2 border-blue-600 text-blue-600` : ''}`}
                            >
                                {menu.name}
                            </Link>
                        ))
                    }
                </div>
                {/* Social icons  */}
                <div className="w-[200px] flex flex-row justify-around items-center">
                    {
                        SOCIAL_MENU.map((social) => (
                            <Link
                                key={social.name}
                                href={social.link}
                                className="hover:text-blue-600 transition-all ease-in-out"
                                aria-label={`${social.icon} for link ${social.link}`}
                                target="_blank"
                            >
                                <CustomIcon icon={social.icon} />
                            </Link>
                        ))
                    }
                </div>
            </div>
            {/* Big screen menu end */}

            {/* Mobile screen menu */}
            <div className="w-full mx-0 flex flex-col gap-0 md:hidden">
                <div className="w-full mx-0 flex flx-row px-2 py-4 justify-between items-center">
                    {/* the logo */}
                    <div className="w-[200px] flex items-center">
                        <Link
                            className="uppercase font-extrabold font-mono text-2xl flex flex-row justify-center items-center gap-2"
                            href="/"
                        >
                            <Image
                                src="/images/logo-wide-2.png"
                                height={75}
                                width={150}
                                className="inline-block"
                                alt="StatWizard Logo"
                            />
                        </Link>
                    </div>

                    {/* Clicked button */}
                    <div className="w-[30px] mr-4">
                        <button
                            type="button"
                            id="mobile-menu-button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
                            <svg
                                id="mobile-menu-close-icon"
                                className="bg-white text-neutral-800 outline-none block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            {/* Icon when menu is open., Menu open: "block", Menu closed: "hidden" */}
                            <svg
                                id="mobile-menu-open-icon"
                                className="bg-white text-neutral-800 outline-none hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* mobile menu */}
                <div id="mobile-menu" className="bg-white w-full mx-0 hidden">
                    <ul className="flex flex-col gap-2">
                        {
                            MAIN_MENU.map((menu) => (
                                <li
                                    key={menu.name}
                                    className="px-4 py-2 box-border hover:bg-gray-100 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
                                >
                                    <Link href={menu.route}>
                                        {menu.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {/* Mobile screen menu end */}
        </nav>

    )
}