import { makeGroups } from '../lib/common';
import { IResearchItem, ITalk, RESEARCH_PAPERS, TALKS } from './content';
import { SiArxiv, SiDoi } from "react-icons/si";
import Footer from '../ui/Footer';
import { CustomIcon } from '../ui/CustomIcon';
import { FaDatabase, FaGithub, FaMicrophoneLines } from 'react-icons/fa6';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Research | StatWizard',
}

export default function ResearchPage() {

    const researchGroups = makeGroups<IResearchItem | ITalk>(
        [
            ...RESEARCH_PAPERS,
            ...TALKS
        ],
        (item) => item.date.slice(0, 4)
    );

    return (
        <>
            <section className="mx-2 md:mx-0">
                <div className="my-8 max-w-6xl mx-auto flex flex-row justify-center gap-4 items-center">
                    <p className="font-base text-neutral-800 text-xl">
                        My <span className="text-2xl font-semibold text-blue-600">Life Goal</span> is
                        to try unwrapping the gift of knowledge
                    </p>
                    <Image
                        src="/svg/infinityBox.svg"
                        className="w-full max-w-[50px] max-h-[50px]"
                        alt="InfinityBox"
                        width={50}
                        height={50}
                    />
                </div>

                <div className="max-w-6xl mx-auto mt-8 pt-8 border-t-[1px] border-t-gray-300">
                    <h2 className="italic text-neutral-800">Here is a list of my publications, a few talks and my overall research experiences!</h2>
                </div>

                {/*Main content area*/}
                <div className='mx-4 md:mx-auto max-w-6xl'>
                    {
                        Object.keys(researchGroups).sort().reverse().map((year) => (
                            <div className="mt-8" key={year}>
                                <h3 className="text-blue-800 text-2xl">
                                    {year}
                                </h3>
                                <div className="w-full my-2 border-b-[1px] border-b-blue-700"></div>
                                <div>
                                    {
                                        researchGroups[year] &&
                                        (researchGroups[year].length > 0) &&
                                        researchGroups[year].map((item) => (
                                            <div key={item.title} className="grid grid-cols-6 gap-4 items-center">
                                                <p className="w-full m-4 font-semibold text-center col-span-1 bg-blue-700 text-white rounded-sm text-xs text-clip">
                                                    {
                                                        (item as any)?.authors ? "PUBLICATION" : "TALK"
                                                    }
                                                </p>
                                                {
                                                    (item as any)?.authors &&       // meaning it is a publication
                                                    (
                                                        <div className='col-span-5 ml-4 my-2'>
                                                            <p className="font-semibold">
                                                                {item.title}
                                                                - <span className="font-normal text-sm italic">
                                                                    {(item as IResearchItem).authors.join(", ")}
                                                                </span> | <span className="font-normal text-sm">
                                                                    {item.summary}
                                                                </span>
                                                            </p>
                                                            {/* Links list */}
                                                            <div className="flex flex-row gap-4">
                                                                {
                                                                    (item as IResearchItem).links.map((ll) => (
                                                                        <a
                                                                            key={ll.url}
                                                                            href={ll.url}
                                                                            className="text-blue-600 text-sm hover:underline cursor-pointer"
                                                                        >
                                                                            {
                                                                                ll.type === "arxiv" &&
                                                                                (
                                                                                    <>
                                                                                        <CustomIcon
                                                                                            icon={SiArxiv}
                                                                                            style={{ display: "inline-block", marginRight: "5px" }}
                                                                                        />
                                                                                        Preprint
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {
                                                                                ll.type === "code" &&
                                                                                (
                                                                                    <>
                                                                                        <CustomIcon
                                                                                            icon={FaGithub}
                                                                                            style={{ display: "inline-block", marginRight: "5px" }}
                                                                                        />
                                                                                        GitHub
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {
                                                                                ll.type === "journal" &&
                                                                                (
                                                                                    <>
                                                                                        <CustomIcon
                                                                                            icon={SiDoi}
                                                                                            style={{ display: "inline-block", marginRight: "5px" }}
                                                                                        />
                                                                                        {ll.detail}
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {
                                                                                ll.type === "data" &&
                                                                                (
                                                                                    <>
                                                                                        <CustomIcon
                                                                                            icon={FaDatabase}
                                                                                            style={{ display: "inline-block", marginRight: "5px" }}
                                                                                        />
                                                                                        Data
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </a>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    !(item as any)?.authors &&  // meaning it is a talk
                                                    (
                                                        <div className='col-span-5 ml-4 my-2'>
                                                            <p className="font-semibold">{item.title}
                                                                <span className="font-normal text-sm">| {item.summary}</span>
                                                            </p>
                                                            {
                                                                (item as ITalk).links.slide &&
                                                                (
                                                                    <a href={(item as ITalk).links.slide} target="_blank" className="text-blue-600 text-sm hover:underline cursor-pointer">
                                                                        <CustomIcon
                                                                            icon={FaMicrophoneLines}
                                                                            style={{ display: "inline-block", marginRight: "5px" }}
                                                                        />
                                                                        Slides
                                                                    </a>
                                                                )
                                                            }

                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}