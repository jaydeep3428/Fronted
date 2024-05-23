import React, { useState } from "react"

function Toggle() {
    const [status, setStatus] = useState(true)
    return (
        <div>
            {
                status ?
                    <h1>Hello React</h1>
                    : null
            }

            {/* <button onClick={() => setStatus(false)}>Hide</button> */}
            <button onClick={() => setStatus(!status)}>Toggle</button>
        </div>
    )
}

export default Toggle