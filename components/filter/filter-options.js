import { PlusIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";

const FilterOptions = (props) => {
  const [showOptions, setShowOptions] = useState(!props.collapse);
  const { FilterOptionList } = props;
  let filterString = "";
  const obj = {};

  const createObjFromString = (queryString) => {
    const query = queryString.split("=");
    return query;
  };

  const objToPath = () => {
    filterString = "";
    for (const key in obj) {
      filterString = `${key}=`;
      console.log(obj[key]);
      for (const key_2 in obj[key]) filterString += `${obj[key][key_2]} `;
    }
  };

  const onCheckHandler = (queryString) => {
    const query = createObjFromString(queryString);

    if (!obj[query[0]]) {
      let temp = {};
      temp[query[1]] = query[1];
      obj[query[0]] = temp;
    } else {
      let temp = obj[query[0]];
      temp[query[1]] = query[1];
      obj[query[0]] = temp;
    }

    objToPath();
    console.log(filterString);
  };

  const onUncheckHandler = (queryString) => {
    const query = createObjFromString(queryString);
    let temp = obj[query[0]];
    delete temp[query[1]];
    filterString = "";
    objToPath();
    console.log(filterString);
  };

  return (
    <div>
      {Object.keys(FilterOptionList).map((key) => (
        <div key={key} className="py-4 border-b border-gray-200 capitalize">
          <div
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => setShowOptions((prevState) => !prevState)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            {key}
          </div>
          {showOptions && (
            <div>
              {FilterOptionList[key].map((item) => (
                <div key={item} className="ml-6 text-sm mb-1">
                  <input
                    type="checkbox"
                    value={`${key}=${item}`}
                    className="mr-2"
                    onChange={(event) =>
                      event.target.checked
                        ? onCheckHandler(event.target.value)
                        : onUncheckHandler(event.target.value)
                    }
                  />
                  {item}
                </div>
              ))}
              {props.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterOptions;
