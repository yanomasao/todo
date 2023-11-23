import React, { useEffect, useState } from "react";
import axios from "axios";

const Foo = () => {
  const [apiMessage, setApiMessage] = useState(null);

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((res) => {
        console.log(res.data);
        setApiMessage(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  })
  if (apiMessage === null) {
    return <div>Loading...</div>;
  }

  return <div>{apiMessage}</div>;
};

export default Foo;
