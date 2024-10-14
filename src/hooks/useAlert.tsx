import { useState } from "react";

const useAlert = (text: string) => {
  const [message, setMessage] = useState(text);

  setTimeout(() => {
    setMessage("");
  }, 2000);

  return { message, setMessage };
};

export default useAlert;
