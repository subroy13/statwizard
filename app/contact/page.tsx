import Footer from "../ui/Footer";

export default function ContactPage() {
  return (
    <section>
      <div className="w-full h-[100vh] flex flex-col items-center justify-between">
        <div className="w-full mt-16">
          <img src="/svg/undraw_mathematics.svg" className="w-[200px] h-[200px] mx-auto mx-4" />
          <p className="max-w-6xl mx-4 md:mx-auto text-gray-700 text-center my-4 font-light text-xl">
            I am always up for interesting collaborations, chat around with new ideas, connecting with people or hang around!
            <br />
            Feel Free to reach out to me.
          </p>
        </div>
        <div className="mt-16 w-full h-full bg-gradient-to-t from-neutral-900 to-black">
          <Footer />
        </div>
      </div>
    </section>
  );
}
