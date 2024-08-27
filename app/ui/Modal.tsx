
import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ onClose, children, title }: {
    onClose: () => void;
    children: React.ReactElement;
    title?: string;
}) {
    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 bg-opacity-70 z-50">
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className="flex w-screen my-4 justify-center items-center">
                <div className="max-w-6xl max-h-[80vh] mx-auto bg-white">
                    <div className="flex flex-row-reverse gap-4 items-center">
                        <button
                            onClick={handleCloseClick}
                            className="bg-gray-200 p-2 m-2 rounded-md w-[30px] h-[30px] text-center flex justify-center items-center hover:bg-gray-400"
                        >
                            x
                        </button>
                        {title &&
                            <h1 className="w-full text-center text-lg text-blue-600 font-semibold">{title}</h1>
                        }
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as HTMLElement
    );
}