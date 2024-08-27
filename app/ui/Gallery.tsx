"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function Gallery(props: { imgList: string[]; }) {

    const [showImageModal, setShowImageModal] = useState<string>("");

    const handleImageClick = (imgsrc: string) => {
        console.log(`Clicked ${imgsrc}`);
        setShowImageModal(imgsrc);
    }

    return (
        <>
            <div className="py-8 mx-4 grid grid-cols-2 md:grid-cols-6 gap-4 justify-start items-center">
                {
                    props.imgList.map((imgsrc) => (
                        <button
                            key={imgsrc}
                            onClick={() => handleImageClick(imgsrc)}
                        >
                            <img
                                src={imgsrc}
                                className="bg-gray-600 p-[1px] h-[100px] w-auto mx-auto"
                            />
                        </button>
                    ))
                }
            </div>
            {
                (showImageModal.length > 0) && (
                    <Modal
                        onClose={() => setShowImageModal("")}
                    >
                        <img
                            src={showImageModal}
                            alt={"image"}
                            className="max-h-[90vh]"
                        />
                    </Modal>
                )
            }
        </>
    )
}