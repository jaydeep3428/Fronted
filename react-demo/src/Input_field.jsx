import React, { useState } from "react";

function Input_field() {
    const [data, setData] = useState(null)
    const [print, setPrint] = useState(false)
    function getData(val) {
        setData(val.target.value)
    }
    return (
        <div>
            <h2>Get Input Box Value!</h2>
            {
                print ?
                    <h2>{data}</h2>
                    : null
            }
            <input type="text" onChange={getData} /> <br /> <br />
            <button onClick={() => setPrint(true)}>Print</button>
        </div >
    );
}

export default Input_field