import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationModal = (props) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByCatagories, setSortByCatagories] = useState(true);
  const [isThereBrandSection, setIsThereBrandSection] = useState(false);

  useEffect(() => {
    fetch("/Links/links.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(
          data[props.menu].categories.map((current_category, index) => {
            return (
              <div key={index} className="mb-4">
                <div className="font-bold mb-1 flex items-center">
                  {current_category.link !== "/" ? (
                    <Link href={current_category.link}>
                      {current_category.title}
                    </Link>
                  ) : (
                    <div className="select-none text-gray-300">{current_category.title}</div>
                  )}
                  {current_category.hot && (
                    <div
                      className="inline-block ml-2 rounded-full bg-yellow-300 text-red-800 tracking-widest"
                      style={{ fontSize: ".5rem", padding: "0 5px" }}
                    >
                      hot
                    </div>
                  )}
                  {current_category.new && (
                    <div
                      className="inline-block ml-2 rounded-full bg-red-500 text-white tracking-widest"
                      style={{ fontSize: ".5rem", padding: "0 5px" }}
                    >
                      new
                    </div>
                  )}
                </div>
                <div className="capitalize">
                  {current_category.links.map((link) => {
                    return (
                      <div key={link.title}>
                        {link.link !== "/" ? (
                          <Link href={link.link}>{link.title}</Link>
                        ) : (
                          <div className="select-none text-gray-300">{link.title}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        );

        if (data[props.menu].brands) {
          setIsThereBrandSection(true);

          setBrands(
            data[props.menu].brands.map((current_category, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className="font-bold mb-1 flex items-center">
                    {current_category.link !== "/" ? (
                      <Link href={current_category.link}>
                        {current_category.title}
                      </Link>
                    ) : (
                      <div className="select-none">
                        {current_category.title}
                      </div>
                    )}
                  </div>
                  <div className="capitalize">
                    {current_category.links.map((link) => {
                      return (
                        <div key={link.title}>
                          {link.link !== "/" ? (
                            <Link href={link.link}>{link.title}</Link>
                          ) : (
                            <div className="select-none text-gray-300">{link.title}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          );
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      onMouseOver={props.onMouseOverHandler}
      onMouseOut={props.onMouseOutHandler}
      className={`absolute w-full max-w-screen-xl left-0 top-24 bg-gray-50 hidden ${
        props.showModal && "show-block"
      }`}
    >
      <div className="border-b flex items-center text-primary">
        <div className="capitalize mx-6 text-sm font-semibold text-gray-400">
          Sort By:
        </div>
        <div
          onMouseOver={() => setSortByCatagories(true)}
          className={`bg-gray-200 py-4 px-6 border-r-2 border-gray-50 ${
            sortByCatagories && "font-bold"
          }`}
        >
          categories
        </div>
        {isThereBrandSection && (
          <div
            onMouseOver={() => setSortByCatagories(false)}
            className={`bg-gray-200 py-4 px-6 ${
              !sortByCatagories && "font-bold"
            }`}
          >
            brands
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="text-sm flex flex-col flex-wrap h-96 mb-10">
          {loading && <h1>Loading...</h1>}
          {!loading && (sortByCatagories ? categories : brands)}
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
