import { Fragment, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  SearchIcon,
  CollectionIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import NavigationModal from "./navigation-modal";

const NavigationBar = () => {
  const [showMensLinks, setShowMensLinks] = useState(false);
  const [showWomensLinks, setShowWomensLinks] = useState(false);
  const [showKidsLinks, setShowKidsLinks] = useState(false);
  const [showIndiesLinks, setShowIndiesLinks] = useState(false);
  const [showHomeAndKitchenLinks, setShowHomeAndKitchenLinks] = useState(false);

  const showMensModal = () => {
    setShowMensLinks(true);
  };

  const hideMensModal = () => {
    setShowMensLinks(false);
  };

  const showWomensModal = () => {
    setShowWomensLinks(true);
  };

  const hideWomensModal = () => {
    setShowWomensLinks(false);
  };

  const showKidsModal = () => {
    setShowKidsLinks(true);
  };

  const hideKidsModal = () => {
    setShowKidsLinks(false);
  };

  const showIndiesModal = () => {
    setShowIndiesLinks(true);
  };

  const hideIndiesModal = () => {
    setShowIndiesLinks(false);
  };

  const showHomeAndKitchenModal = () => {
    setShowHomeAndKitchenLinks(true);
  };

  const hideHomeAndKitchenModal = () => {
    setShowHomeAndKitchenLinks(false);
  };

  return (
    <Fragment>
      <header className="shadow-lg bg-white items-center w-screen fixed top-0 left-0 z-50">
        <div className="relative max-w-screen-xl box-border px-4 h-24 mx-auto flex flex-row items-center justify-between">
          <div className="h-full w-auto flex flex-col justify-center align-center">
            <Link href="/">
              <a>
                <Image
                  src="/images/Ajio-Logo.svg"
                  alt=""
                  width={130}
                  height={37.69}
                />
              </a>
            </Link>
          </div>

          <div className="h-full flex flex-col text-primary">
            <div className="flex justify-end items-center tracking-wider text-xs space-x-8 h-10 mt-2">
              <div>
                <Link href="/">Sign In / Join AJIO</Link>
              </div>
              <div>
                <Link href="/">Customer Care</Link>
              </div>
            </div>
            <nav className="uppercase flex items-center text-base h-full">
              <div className="flex space-x-8 h-full mr-8">
                <div
                  onMouseOver={showMensModal}
                  onMouseOut={hideMensModal}
                  className="border-b-4 flex items-center self-stretch border-opacity-0 border-black hover:border-opacity-100 on-hover-bold"
                >
                  <Link href="/">
                    <a className="ohb">men</a>
                  </Link>
                  <NavigationModal
                    onMouseOver={showMensModal}
                    onMouseOut={hideMensModal}
                    showModal={showMensLinks}
                    menu="men"
                  />
                </div>

                <div
                  onMouseOver={showWomensModal}
                  onMouseOut={hideWomensModal}
                  className="border-b-4 flex items-center self-stretch border-opacity-0 border-black hover:border-opacity-100"
                >
                  <Link href="/">women</Link>
                  <NavigationModal
                    onMouseOver={showWomensModal}
                    onMouseOut={hideWomensModal}
                    showModal={showWomensLinks}
                    menu="women"
                  />
                </div>

                <div
                  onMouseOver={showKidsModal}
                  onMouseOut={hideKidsModal}
                  className="border-b-4 flex items-center self-stretch border-opacity-0 border-black hover:border-opacity-100"
                >
                  <Link href="/">kids</Link>
                  <NavigationModal
                    menu="kids"
                    showModal={showKidsLinks}
                    onMouseOver={showKidsModal}
                    onMouseOut={hideKidsModal}
                  />
                </div>

                <div
                  onMouseOver={showIndiesModal}
                  onMouseOut={hideIndiesModal}
                  className="border-b-4 flex items-center self-stretch border-opacity-0 border-black hover:border-opacity-100"
                >
                  <Link href="/">indie</Link>
                  <NavigationModal
                    menu="indie"
                    onMouseOver={showIndiesModal}
                    onMouseOut={hideIndiesModal}
                    showModal={showIndiesLinks}
                  />
                </div>

                <div
                  onMouseOver={showHomeAndKitchenModal}
                  onMouseOut={hideHomeAndKitchenModal}
                  className="border-b-4 flex items-center self-stretch border-opacity-0 border-black hover:border-opacity-100"
                >
                  <Link href="/">home and kitchen</Link>
                  <NavigationModal
                    onMouseOver={showHomeAndKitchenModal}
                    onMouseOut={hideHomeAndKitchenModal}
                    showModal={showHomeAndKitchenLinks}
                    menu="home and kitchen"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <form className="group border rounded-full px-3 py-1 text-gray-400 bg-gray-200 flex items-center">
                  <input
                    type="text"
                    placeholder="Search AJIO"
                    className="bg-gray-200 mr-2 focus:outline-none"
                  />
                  <button type="submit">
                    <SearchIcon className="h-5 w-5" />
                  </button>
                </form>
                <div className="p-2 rounded-full text-white bg-primary">
                  <Link href="/">
                    <a>
                      <CollectionIcon className="h-5 w-5" />
                    </a>
                  </Link>
                </div>
                <div className="p-2 rounded-full text-white bg-primary">
                  <Link href="/cart">
                    <a>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </a>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div
        className={`fixed z-10 top-0 right-0 bottom-0 left-0 bg-black opacity-30 hidden ${
          (showMensLinks ||
            showWomensLinks ||
            showKidsLinks ||
            showIndiesLinks ||
            showHomeAndKitchenLinks) &&
          "show-block"
        }`}
      ></div>
    </Fragment>
  );
};

export default NavigationBar;
