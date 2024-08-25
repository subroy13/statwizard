export default function NotFoundPage() {
    return (
        <div className="container min-h-[100vh] mx-auto flex flex-col justify-center items-center gap-4">
            <p className="font-normal text-sm text-neutral-900 text-justify max-w-4xl">Looks like you've lost! Let us help you get back!</p>
            <img src="/images/img2.webp" className="rounded-full w-[200px] h-[200px]" />
            <a href="/"
                className="py-2 px-6 bg-neutral-50 border-2 border-neutral-900 text-neutral-900 rounded-sm shadow-sm
            transitiion-all ease-in-out duration-200
            hover:bg-neutral-800 hover:text-neutral-50 focus:bg-neutral-800 focus:text-neutral-50">
                Go back to homepage
            </a>
        </div>

    )
}