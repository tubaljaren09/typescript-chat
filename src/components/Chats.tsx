import React from "react";

const Chats = (): React.JSX.Element => {
  return (
    <div>
      <div className="flex items-center p-2.5 gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img
          className="w-14 h-14 rounded-[50%] object-cover"
          src="https://images.pexels.com/photos/15556345/pexels-photo-15556345/free-photo-of-woman-with-a-long-braid-sanding-in-the-field.jpeg"
          alt=""
        />
        <div>
          <span className="text-lg font-medium">Jane</span>
          <p className="text-sm text-gray-50">Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
