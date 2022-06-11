import React from "react";
import { useEffect } from "react";
const Message = ({ message, setMessage }) => {
  const { text, statusCode } = message;

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (text) {
        setMessage({ text: "", statusCode: "" });
      }
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [statusCode]);

  return (
    <div
      className={`${
        text ? "visible" : "hidden"
      } rounded-3xl text-center p-3  w-[300px] border-2 bg-white absolute top-[100px] left-[37.5px]`}
    >
      {statusCode == 200 && <p>Congratulations!</p>}
      {statusCode == 409 && <p>Warning!</p>}
      {statusCode == 500 && <p>Error!</p>}
      <hr />
      <p className="p-5 font-bold">{text}</p>
    </div>
  );
};

export default Message;
