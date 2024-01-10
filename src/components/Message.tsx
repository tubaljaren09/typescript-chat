import React, { useState } from "react";

const Message = (): React.JSX.Element => {
  const [owner, setOwner] = useState<boolean>(true);
  return (
    <>
      {owner ? (
        <div className="flex flex-row-reverse gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="w-10 h-10 rounded-[50%] object-cover"
              src="https://images.pexels.com/photos/19745509/pexels-photo-19745509/free-photo-of-close-up-of-a-raccoon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="max-w-[80%] flex flex-col gap-2.5 items-end">
            <p className="bg-[#8da4f1] text-white py-2.5 px-5 rounded-tl-xl rounded-br-xl rounded-bl-xl max-w-max">
              hello
            </p>
            <img
              className="w-[50%]"
              src="https://images.pexels.com/photos/19745509/pexels-photo-19745509/free-photo-of-close-up-of-a-raccoon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="w-10 h-10 rounded-[50%] object-cover"
              src="https://images.pexels.com/photos/19745509/pexels-photo-19745509/free-photo-of-close-up-of-a-raccoon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="max-w-[80%] flex flex-col gap-2.5">
            <p className="bg-white py-2.5 px-5 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-max">
              hello
            </p>
            <img
              className="w-[50%]"
              src="https://images.pexels.com/photos/19745509/pexels-photo-19745509/free-photo-of-close-up-of-a-raccoon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
