import React, { useEffect, useState } from "react";
import axios from "axios";

const Foo = () => {
    const [apiMessage, setApiMessage] = useState(null);
    // let apiMessage: any = {};
    // const setApiMessage = (value: any) => {
    //     apiMessage = value;
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/todo");
                console.log(res.data[0]);
                setApiMessage(res.data[0]);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);
    console.log(apiMessage)

    if (apiMessage === null) {
        return <div>Loading...</div>;
    }

    return <div>{apiMessage['title']}</div>;
    // return <div>FOOO</div>;
    // return <div>{JSON.stringify(apiMessage)}</div>;
};

export default Foo;
