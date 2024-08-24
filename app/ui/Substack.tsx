export default function SubStack() {
    return (
        <div className="flex flex-col items-center justify-center">
            <iframe src="https://statwizard.substack.com/embed" width="480" height="320"
                style={{
                    border: "1px solid black",
                    background: "black",
                }}
                frameBorder="0" scrolling="no"></iframe>
        </div>
    )
}