import { Fragment, useEffect, useState } from "react";

import Link from "next/link";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import FilterOptions from "../../components/filter/filter-options";
import ShowMoreModal from "../ui/show-more-modal";
import ColorRadio from "../ui/color-radio";

const CLOTH_COLORS = [
  { color: "Beige", colorCode: "#f5f1de" },
  { color: "Black", colorCode: "#000000" },
  { color: "Blue", colorCode: "#0060ff" },
  { color: "Bronze", colorCode: "#cd7f32" },
  { color: "Brown", colorCode: "#ad825d" },
  { color: "Burgundy", colorCode: "#8c001a" },
  { color: "Copper", colorCode: "#c87533" },
  { color: "Cream", colorCode: "#ffffcc" },
  { color: "Gold", colorCode: "#d4af37" },
  { color: "Green", colorCode: "#00ff00" },
  { color: "Grey", colorCode: "#d3d3d3" },
  { color: "Indigo", colorCode: "#4b0082" },
  { color: "Khaki", colorCode: "#f0e68c" },
  { color: "Maroon", colorCode: "#800000" },
  { color: "Metallic", colorCode: "#ffffff" },
  { color: "Multi", colorCode: "#b705fe" },
  { color: "Navy", colorCode: "#000080" },
  { color: "Nude", colorCode: "#f8c890" },
  { color: "Olive", colorCode: "#808000" },
  { color: "Orange", colorCode: "#ff6600" },
  { color: "Peach", colorCode: "#FFE5B4" },
  { color: "Pink", colorCode: "#ff69b4" },
  { color: "Purple", colorCode: "#800080" },
  { color: "Red", colorCode: "#ff0000" },
  { color: "Silver", colorCode: "#ccc" },
  { color: "White", colorCode: "#f3f3f3" },
  { color: "Yellow", colorCode: "#ffff00" },
];

const SideBar = () => {
  const [showRefineBy, setShowRefineBy] = useState(true);
  const [popularBrands, setPopularBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showBrandsModal, setShowBrandsModal] = useState(false);
  const [showColorsModal, setShowColorsModal] = useState(false);

  const openBrandsModal = () => {
    setShowBrandsModal(true);
  };

  const closeBrandsModal = () => {
    setShowBrandsModal(false);
  };

  const openColorsModal = () => {
    setShowColorsModal(true);
  };

  const closeColorsModal = () => {
    setShowColorsModal(false);
  };

  const showRefineByHandler = () => setShowRefineBy((prevState) => !prevState);

  useEffect(() => {
    fetch("/brands/brands.json")
      .then((res) => res.json())
      .then((data) => {
        setPopularBrands(data.popular);
        setBrands(data.brands);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full p-3 h-full">
      <div className="text-gray-600">
        <div
          className="select-none flex text-gray-800 items-center justify-between font-semibold text-lg cursor-pointer"
          onClick={showRefineByHandler}
        >
          Refine By
          {showRefineBy ? (
            <ChevronUpIcon className="w-6 h-6" />
          ) : (
            <ChevronDownIcon className="w-6 h-6" />
          )}
        </div>
        <div className={`${!showRefineBy && "hidden"}`}>
          {/* ---------------------------------------------------------------- */}
          {/* Price Options*/}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            collapse={false}
            FilterOptionList={{
              price: [
                "below rs.500",
                "rs.500-1000",
                "rs.1001-1500",
                "rs.1501-2000",
                "rs.2001-2500",
              ],
            }}
          >
            <form className="pt-2 mt-2 ml-6 border-t">
              <div className="flex items-center mb-2 text-sm">
                Enter Price Range
              </div>
              <div className="flex w-full justify-between items-center">
                <input
                  type="number"
                  className="rounded-none w-16 focus:outline-none border text-sm p-1"
                  placeholder="Max"
                />
                <input
                  type="number"
                  className="rounded-none w-16 focus:outline-none border text-sm p-1"
                  placeholder="Min"
                />
                <button
                  type="submit"
                  className="box-border bg-gray-100 rounded-full p-1 border border-gray-300"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </form>
          </FilterOptions>
          {/* ---------------------------------------------------------------- */}
          {/* Brands Options*/}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            FilterOptionList={{ brands: popularBrands }}
            collapse={false}
          >
            <div
              className="select-none text-xs ml-6 mt-3 uppercase cursor-pointer"
              style={{ color: "#d5a249" }}
              onClick={openBrandsModal}
            >
              More
            </div>
            {showBrandsModal && (
              <ShowMoreModal
                width="max-w-screen-lg"
                closeModalHandler={closeBrandsModal}
              >
                <div className="border-b pb-6">
                  <div className="text-2xl font-semibold mb-4">
                    Choose BRANDS
                  </div>
                  <div className="flex space-x-5 text-sm font-bold">
                    {Object.keys(brands).map((letter) => (
                      <div key={letter}>
                        <Link href={`#${letter}`}>{letter}</Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col flex-wrap h-96 box-border overflow-x-scroll my-3">
                  <div className="uppercase font-bold mb-2">Popular</div>
                  {popularBrands.map((brand) => (
                    <div key={brand} className="mb-1 text-sm mr-12">
                      <input type="checkbox" className="mr-1 my-2" /> {brand}
                    </div>
                  ))}
                  {Object.keys(brands).map((brand) => (
                    <Fragment key={brand}>
                      <div id={brand} className="uppercase font-bold my-2">
                        {brand}
                      </div>

                      {brands[brand].map((brand) => (
                        <div key={brand} className="mb-1 text-sm mr-12">
                          <input type="checkbox" className="mr-1 my-2" />{" "}
                          {brand}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
                <div className="flex items-center justify-between py-3 text-sm">
                  <div className="flex space-x-8 select-none">
                    <div>Select All</div>
                    <div>Clear All</div>
                  </div>
                  <div
                    style={{ backgroundColor: "#d5a249" }}
                    className="text-white px-10 py-3 tracking-wide uppercase font-semibold"
                  >
                    Apply
                  </div>
                </div>
              </ShowMoreModal>
            )}
          </FilterOptions>
          {/* ---------------------------------------------------------------- */}
          {/* Occasion Options*/}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            FilterOptionList={{
              occasion: [
                "active",
                "casual",
                "occasion",
                "special occasion",
                "universal",
                "work",
              ],
            }}
            collapse={true}
          />
          {/* ---------------------------------------------------------------- */}
          {/* Discount Options*/}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            FilterOptionList={{
              discount: ["0-20%", "21-30%", "31-40%", "41-50%", "51-80%"],
            }}
            collapse={true}
          />
          {/* ---------------------------------------------------------------- */}
          {/* Colors Options */}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            FilterOptionList={{
              colors: ["Beige", "Black", "Blue", "Bronze", "Brown"],
            }}
            collapse={true}
          >
            <div
              className="select-none text-xs ml-6 mt-3 uppercase cursor-pointer"
              style={{ color: "#d5a249" }}
              onClick={openColorsModal}
            >
              More
            </div>
            {showColorsModal && (
              <ShowMoreModal
                width="max-w-screen-lg"
                closeModalHandler={closeColorsModal}
              >
                <div className="text-2xl font-semibold pb-4 border-b">
                  Choose COLORS
                </div>

                <div className="my-3 flex flex-col flex-wrap h-96 box-border border-b">
                  {CLOTH_COLORS.map((color) => (
                    <div key={color.color} className="mb-1 text-sm mr-12 flex items-center space-x-2">
                      <input type="checkbox" color={color.colorCode} name="filter_color" value={color.color} radioSize="1.5rem" />
                      <span>{color.color}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between py-3 text-sm">
                  <div className="flex space-x-8 select-none">
                    <div>Select All</div>
                    <div>Clear All</div>
                  </div>
                  <div
                    style={{ backgroundColor: "#d5a249" }}
                    className="text-white px-10 py-3 tracking-wide uppercase font-semibold"
                  >
                    Apply
                  </div>
                </div>
              </ShowMoreModal>
            )}
          </FilterOptions>
          {/* ---------------------------------------------------------------- */}
          {/* Size & Fit Options */}
          {/* --------------------------------------------------------------- */}
          <FilterOptions
            FilterOptionList={{
              discount: [
                "XXS",
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL",
                "3XL",
                "4XL",
                "5XL",
              ],
            }}
            collapse={true}
          />
          {/* ---------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
