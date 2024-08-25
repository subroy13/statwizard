import { RESEARCH_PAPERS } from './content';


export default function ResearchPage() {
    return (
        <section className="mx-2 md:mx-0">
            <div className="my-8 max-w-6xl mx-auto flex flex-row justify-center gap-4 items-center">
                <p className="font-base text-neutral-800 text-xl">
                    My <span className="text-2xl font-semibold text-blue-600">Life Goal</span> is
                    to try unwrapping the gift of knowledge
                </p>
                <img src="/svg/infinityBox.svg" className="w-full max-w-[50px] max-h-[50px]" />
            </div>

            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t-[1px] border-t-gray-300">
                <h2 className="italic text-neutral-800">Here is a list of my publications, a few talks and my overall research experiences!</h2>
            </div>

            {/*Main content area*/}
            <div>
                {

                }
            </div>
        </section>
    )   
}