import { imgList3D, LECTURE_NOTES } from "./content";
import Gallery from "../ui/Gallery";
import Footer from "../ui/Footer";

export default function CollectionPage(props: any) {

  return (
    <div className="w-full md:px-auto md:mx-auto">
      {/* First row */}
      <div className="my-16 flex flex-col justify-center items-center">
        <img src="/svg/hobby.svg" className="h-[150px]" />
        <h2 className="text-gray-700 text-lg font-semibold">
          A compendium of ideas, lecture notes, hobbies and some interesting stuffs I have collected over time!
        </h2>
      </div>

      {/* Lecture Notes  */}
      <div className="my-3 grid grid-cols-1 md:grid-cols-6 bg-green-100 w-full">
        <div className="col-span-1 text-center p-4">
          <h3 className="text-green-800 text-2xl font-semibold pb-4">
            Lecture Notes & Assignments
          </h3>
          <p className="text-green-800 text-sm font-light">
            Some lecture notes of different courses around the world!
          </p>
        </div>
        <div className="col-span-5">
          <ul className="text-gray-500 list-disc list-inside dark:text-gray-400 space-y-1 my-4">
            {
              LECTURE_NOTES.map((item, i) => (
                <li key={i}>
                  <a href={item.url} target="_blank" className="text-blue-600 hover:text-underline hover:text-blue-800 focus:text-underline focus:text-blue-800">
                    {item.title}
                  </a>, course offered at <span className="font-semibold">{item.organization}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>


      {/* 3d arts  */}
      <div className="my-3 grid grid-cols-1 md:grid-cols-6 bg-red-100 w-full">
        <div className="col-span-1 text-center p-4">
          <h3 className="text-red-800 text-2xl font-semibold pb-4">3D Arts</h3>
          <p className="text-red-800 text-sm font-light">
            Some 3D models I have created using Blender, Bryce 3D, Wings 3D.
          </p>
        </div>
        <div className="col-span-5">
          <Gallery
            imgList={imgList3D}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}