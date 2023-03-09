import React, { useRef, useState, useEffect } from 'react'

const UseRef = () => {
    const [imageUrl, setImageUrl] = useState("*")
    const imagUrlRef = useRef("");

    console.log("rerender");
    useEffect(() => {
        console.log("useEffect");
        imagUrlRef.current = imageUrl
    })


    return (
        <div>
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value) }}
            >
            </input>
            <div>{imagUrlRef.current}</div>
            <div>{imageUrl}</div>
        </div>
    )
}

export default UseRef