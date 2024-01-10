import React from "react";

const Search = (): React.JSX.Element => {
  return (
    <div className="border-solid border-b-2 border-gray-500">
      <div className="p-2.5">
        <input
          className="bg-transparent border-none text-white outline-none"
          type="text"
          placeholder="Find a user"
        />
      </div>
      <div className="flex items-center p-2.5 gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img
          className="w-14 h-14 rounded-[50%] object-cover"
          src="https://images.pexels.com/photos/15556345/pexels-photo-15556345/free-photo-of-woman-with-a-long-braid-sanding-in-the-field.jpeg"
          alt=""
        />
        <div>
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
