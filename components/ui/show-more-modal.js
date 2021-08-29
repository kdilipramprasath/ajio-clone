import { createPortal } from "react-dom";

import { XIcon } from "@heroicons/react/solid";

const ShowMoreModal = (props) => {
  const closeModal = props.closeModalHandler;

  return createPortal(
    <div
      className="fixed w-screen h-screen z-50 top-0 left-0"
      style={{
        backgroundColor: "rgba(0,0,0,.2)",
      }}
    >
      <div
        className="absolute w-screen h-screen left-0 top-0"
        onClick={closeModal}
      ></div>
      <div
        className={`py-4 px-12 ${props.width} mx-auto bg-gray-50 top-6 relative`}
      >
        <div
          className="absolute top-0 right-0 p-5 cursor-pointer"
          onClick={closeModal}
        >
          <XIcon className="w-5 h-5" />
        </div>
        {props.children}
      </div>
    </div>,
    document.getElementById("overlays")
  );
};

export default ShowMoreModal;
