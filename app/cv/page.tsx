import Footer from "../ui/Footer";
import { EXPERIENCES, SKILLSETS } from "./cvelements";

export default function CVPage() {
    return (
        <>
            <section>
                <div className="container mx-auto w-full h-full">
                    <div className="mt-8 mx-4 grid grid-cols-1 md:grid-cols-4">
                        <div className="col-span-1 w-full flex flex-row-reverse">
                            <img src="/svg/eye.svg" className="w-[200px] h-[200px] mx-4" />
                        </div>
                        <div className="col-span-3 mx-4 md:mx-0">
                            <p className="text-black text-right font-semibold mb-4">
                                To download my CV in standalone PDF format, please click <a className="text-blue-600 hover:underline cursor-pointer" href="/content/cv.pdf" target="_blank">here</a>
                            </p>

                            <h1 className="text-align text-black italic">I have experience using the following technologies</h1>
                            <div className="flex flex-col gap-4 mr-4">
                                {
                                    SKILLSETS.map((set) => (
                                        <div>
                                            <h3 key={set.category} className="text-right border-b-[1px] border-b-blue-800 text-blue-600 my-4">
                                                {set.category}
                                            </h3>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {set.items.map((badge, i) => (
                                                    <img src={badge} key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* <!-- Experiences Section --> */}
                    <div className="h-[1px] w-full bg-gray-300 my-8"></div>
                    <h1 className="text-center font-semibold text-lg">Experiences</h1>
                    <div className="relative wrap overflow-hidden p-10 h-full">
                        <div className="absolute h-full border-[2px] border-blue-600 right-[50%]"></div>
                        <div className="absolute h-full border-[2px] border-blue-600 left-[50%]"></div>
                        {
                            EXPERIENCES.map((exp, i) => (
                                <div className={`mb-4 flex justify-between ${i % 2 === 0 ? "flex-row-reverse" : "flex-row"} items-center w-full ${i % 2 === 0 ? "left" : "right"}-timeline`}>
                                    <div className="order-1 w-5/12"></div>
                                    <div className={`order-1 w-5/12 px-1 py-4 text-${i % 2 === 0 ? "right" : "left"}`}>
                                        <p className="mb-2 text-base text-blue-400">
                                            {exp.timeline}
                                        </p>
                                        <h4 className="mb-2 font-bold text-xl md:text-2xl">
                                            {exp.title}
                                        </h4>
                                        <h4 className="mb-2 font-light text-lg text-neutral-700">
                                            {exp.organization}
                                        </h4>
                                        <div className="text-sm text-left leading-snug text-neutral-800 text-opacity-100">
                                            <ul>
                                                <hr />
                                                {
                                                    exp.description.map((desc) => (<li>{desc}</li>))
                                                }
                                                <hr />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <img className="mx-auto -mt-36 md:-mt-36" src="/images/launch-rocket.png" />

                </div>
            </section>
            <Footer />
        </>
    )
}