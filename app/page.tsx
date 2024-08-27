import { AFFILIATIONS, MAIN_MENU, SITE_HELLO, SITE_SUBTITLE } from "./constants";
import SubStack from "./ui/Substack";
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/**<!-- Main Logo --> */}
      <div className="hidden md:block w-[200px] h-[200px] absolute inset-x-1/2 inset-y-1/2 -ml-[100px] -mt-[100px] rounded-full border-4 border-l-blue-600 border-b-blue-600 border-r-white border-t-white rotate-45 shadow-lg">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="w-full h-full rounded-full -rotate-45"
        />
      </div>
      {/* Left Right Banner (Desktop) */}
      <section className="hidden md:grid md:grid-cols-2 items-center overflow-x-hidden w-full m-0 p-0 h-[100vh]">
        <div className="bg-white text-blue-600 col-span-1 w-full h-full flex flex-col">
          <div className="mt-32 mr-[150px] ml-auto">
            <h1 id="typehead" className="ml-8 mx-auto text-blue-600 text-4xl font-semibold">
              {SITE_HELLO}
            </h1>
            <div className="mt-2 ml-8">
              <p className="text-light text-md md:text-md animate__animated animate__fadeIn animate__delay-2s text-gray-700">
                {SITE_SUBTITLE}
              </p>
            </div>
            <div className="mt-4 pl-4 flex flex-col">
              {
                AFFILIATIONS.map((item, i) => (
                  <p key={item.organization} className="text-light text-md md:text-md animate__animated animate__fadeIn animate__delay-2s text-gray-700 text-right">
                    {i === 0 ? `I am currently` : ` and `}
                    <span className="font-semibold">
                      {item.position}
                    </span>
                    at
                    <span className="font-semibold text-blue-700 hover:text-blue-900 cursor-pointer">
                      <a href={item.url}>
                        {item.organization}
                      </a>
                    </span>
                  </p>
                ))
              }
            </div>

            {/* <!-- Menu choices --> */}
            <div className="mt-16 pl-auto flex flex-col gap-1 items-end">
              {
                MAIN_MENU.concat([{ name: "CV", route: "/content/cv.pdf" }]).map((menu) => (
                  <a
                    key={menu.name}
                    href={menu.route}
                    className="text-black hover:text-blue-600 hover:border-b-2 hover:border-b-blue-600 transition transition-all ease-in-out roboto-medium py-0 my-0"
                  >
                    {menu.name}
                  </a>
                ))
              }
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 from-50% text-white col-span-1 w-full h-full flex flex-col justify-end">
          {/* <!-- Statwizard --> */}
          <div className="mb-48 mr-auto ml-[150px] pr-8 text-left">
            <p className="mb-8 font-semibold">
              I also actively maintain a blog, discussing various interesting concepts
              and applications of statistics, mathematics, computer science and
              personal finance.
            </p>

            <SubStack />
          </div>
        </div>
      </section>

    </>
  );
}
