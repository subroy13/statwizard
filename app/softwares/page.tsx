import { TbPackage } from "react-icons/tb";
import { makeGroups } from "../lib/common"
import { CustomIcon } from "../ui/CustomIcon";
import Footer from "../ui/Footer";
import { ISoftware, SKILLSETS, SOFTWARES } from "./content"
import { FaCode, FaGlobe } from "react-icons/fa6";

export default function SoftwaresPage() {
    const softwareGroups = makeGroups<ISoftware>(
        SOFTWARES,
        (item) => item.date.slice(0, 4)
    );


    return (
        <>
            <section className="mx-2 md:mx-0">
                {/* Hero section  */}
                <div className="mt-8 mx-4 grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 w-full flex flex-row-reverse">
                        <img src="/svg/eye.svg" className="w-[200px] h-[200px] mx-4" />
                    </div>
                    <div className="col-span-3 mx-4 md:mx-0">
                        <h1 className="text-align text-black italic">I have experience using the following technologies</h1>
                        <div className="flex flex-col gap-4 mr-4">
                            {
                                SKILLSETS.map((set, i) => (
                                    <div key={set.category} className={i === SKILLSETS.length - 1 ? "" : "-mb-6"}>
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


                <div className="max-w-6xl mx-auto mt-8 pt-8 border-t-[1px] border-t-gray-300">
                    <h2 className="italic text-neutral-800">Here is a list of softwares I have developed!</h2>
                </div>

                {/*Main content area*/}
                <div className='mx-4 md:mx-auto max-w-6xl'>
                    {
                        Object.keys(softwareGroups).sort().reverse().map((year) => (
                            <div className="mt-8" key={year}>
                                <h3 className="text-blue-800 text-2xl">
                                    {year}
                                </h3>
                                <div className="w-full my-2 border-b-[1px] border-b-blue-700"></div>
                                <div>
                                    {
                                        softwareGroups[year] &&
                                        (softwareGroups[year].length > 0) &&
                                        softwareGroups[year].map((item) => (
                                            <div key={item.title} className="grid grid-cols-6 gap-4 items-center">
                                                <CustomIcon
                                                    icon={TbPackage}
                                                    className="ml-auto text-blue-700"
                                                    size={30}
                                                />
                                                <div className="col-span-5 ml-4 my-2">
                                                    <p className="font-semibold">
                                                        {item.title} | <span className="font-normal text-sm">
                                                            {item.description}
                                                        </span>
                                                    </p>
                                                    {/* Links list */}
                                                    <div className="flex flex-row gap-4">
                                                        {
                                                            item.links.source !== "NA" && (
                                                                <a href={item.links.source}
                                                                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                                                                >
                                                                    <CustomIcon icon={FaCode} style={{ display: "inline-block", marginRight: "5px" }} />
                                                                    Source Code
                                                                </a>
                                                            )
                                                        }
                                                        {
                                                            item.links.dist &&
                                                            <a href={item.links.dist.url}
                                                                className="text-blue-600 text-sm hover:underline cursor-pointer"
                                                            >
                                                                <CustomIcon icon={FaGlobe} style={{ display: "inline-block", marginRight: "5px" }} />
                                                                {item.links.dist.label}
                                                            </a>
                                                        }
                                                        {
                                                            item.links?.downloads && (
                                                                <img
                                                                    src={item.links.downloads}
                                                                />
                                                            )
                                                        }
                                                        {
                                                            item?.badges && (
                                                                (item.badges ?? []).map((badge) => (
                                                                    <a href={badge.url}>
                                                                        <img src={badge.imgsrc} />
                                                                    </a>
                                                                ))
                                                            )
                                                        }
                                                    </div>
                                                </div>
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