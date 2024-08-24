import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SOCIAL_MENU } from "../constants";

export default function Footer() {
    return (
        <>
            <section
                id="contact-me"
                className="py-8 w-full bg-gradient-to-r from-neutral-900 to-black"
            >
                <div className="max-w-6xl mx-auto my-8 text-white text-center">
                    <p className="font-normal text-2xl py-4">Reach out to me via</p>
                    {/*  Not visible div but used for tailwindcss */}

                    {/* <!-- Social media icons container --> */}
                    <div className="flex flex-row flex-wrap justify-center items-center mx-auto gap-4">
                        {
                            SOCIAL_MENU.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    className="m-2 p-4 h-[55px] w-[55px] flex justify-center items-center
                                    rounded-full border-2 border-white border-solid text-white transition-all 
                                    duration-300 ease-in-out
                                    hover:bg-{{ .color }} focus:bg-{{ .color }} hover:text-white focus:text-white"
                                >
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </section>
            <footer className="bg-neutral-900 text-center text-white">
                {/*  Copyright section */}
                <div className="text-center px-0 py-4 w-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <a className="text-white" href="/">StatWizard.in</a>
                </div>
            </footer>
        </>
    );
}