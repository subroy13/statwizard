import { readdirSync } from "fs";

export default function CollectionPage(props: any) {
  return (
    <div className="w-full px-4 md:px-auto md:mx-auto">
      {/* First row */}
      <div className="my-16 flex flex-col justify-center items-center">
        <img src="/svg/hobby.svg" className="h-[150px]" />
        <h2 className="text-gray-700 text-lg font-semibold">
          A compendium of ideas, lecture notes, hobbies and some interesting stuffs I have collected over time!
        </h2>

        {/* 3d arts  */}
        <div className="grid grid-cols-1 md:grid-cols-6 bg-red-100 w-full">
          <div className="col-span-1 text-center p-4">
            <h3 className="text-red-800 text-2xl font-semibold pb-4">3D Arts</h3>
            <p className="text-red-800 text-sm font-light">
              Some 3D models I have created using Blender, Bryce 3D, Wings 3D.
            </p>
          </div>
          <div className="col-span-5">
            <div className="py-8 mx-4 grid grid-cols-2 md:grid-cols-6 gap-4 justify-start items-center">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


{/* <div class="w-full px-4 md:px-auto md:mx-auto">

    <!-- 3d Arts -->
    <div class="grid grid-cols-1 md:grid-cols-6 bg-red-100 w-full">
        <div class="col-span-1 text-center p-4">
            <h3 class="text-red-800 text-2xl font-semibold pb-4">3D Arts</h3>
            <p class="text-red-800 text-sm font-light">
                One of my favourite hobby is to create 3D models using computer graphics. I use Blender, Bryce 3D, Wings 3D to make these. 
            </p>
        </div>
        <div class="col-span-5">
            <div id = "gallery" class="py-8 mx-4 grid grid-cols-2 md:grid-cols-6 gap-4 justify-start items-center">
                {{ range resources.Match "/3darts/*.*" }}
                    {{ $image := .Fit "300x150 q90" }}
                    <div data-src = "{{ .Permalink }}" class="item">
                        <img
                            src="{{ $image.Permalink }}"
                            class="w-[300px] h-[100px] object-cover hover:scale-105 rounded-md border-2 cursor-pointer"
                        />
                    </div>
                {{ end }}
            </div>
        </div>
    </div>
</div> */}