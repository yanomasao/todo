import React, { useEffect, useState } from "react";
import axios from "axios";

const Foo = () => {
  // try {
  //     const res = axios.get('/api/hello')
  //     return <div>res.data</div>
  // } catch (e) {
  //     console.log(e)
  // }

  const [res, setRes] = useState(null);

  useEffect(() => {
    axios
      .get("/api/hello")
      .then(
        (response) => {
          setRes(response.data)
        console.log(res)
        })
      .catch((err) => console.log(err));
  });
  if (res === null) {
    return <div>Loading...</div>;
  }

  return <div>{res}</div>;
};

export default Foo;
