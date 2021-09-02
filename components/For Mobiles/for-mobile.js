import React, { Fragment } from "react";
import { createPortal } from "react-dom";

const ForMobile = ({ hideDialogue }) => {
  return createPortal(
    <Fragment>
      <div className="lg:hidden fixed top-0 left-0 w-screen h-screen bg-white flex flex-col justify-center items-center">
        <div className="text-xl p-6 text-center">
          This project is not responsive for now for some reasons and only
          supports big screens. If you are viewing this project with screens
          smaller than 10inch it may look odd!
        </div>
        <button
          onClick={hideDialogue}
          className="bg-black text-white font-semibold py-2 px-8 rounded-md"
        >
          OK
        </button>
      </div>
    </Fragment>,
    document.getElementById("overlays")
  );
};

export default ForMobile;
