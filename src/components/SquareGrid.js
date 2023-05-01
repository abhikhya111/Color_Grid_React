import React, { useEffect, useState } from "react";
import axios from "axios";
export default function SquareGrid() {
    const [squareArray, setSquareArray] = useState(null);
    const [color, setColor] = useState([]);
    const [largestColor, setLargestColor] = useState();
    const [noOFColors, setNoOfColors] = useState(0);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    function getColor(n, x, y) {
        let colorArray = [];
        let sqrs = [];

        let i = 0;
        while (i < n) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if (!colorArray.includes(randomColor)) {
                colorArray.push("#" + randomColor);
                i++;
            }
        }
        setColor(colorArray);
        for (let i = 0; i < x; i++) {
            let row = [];
            for (let j = 0; j < y; j++) {
                let randomClrIdx = Math.floor(Math.random() * n);
                row.push(colorArray[randomClrIdx]);
            }
            sqrs.push(row);
        }
        setSquareArray(sqrs);
    }
    const handleClick = async () => {
        const bodyToSend = {
            no_of_colors: noOFColors,
            height,
            width
        }
        axios.post(`http://localhost:5001/colors`, bodyToSend)
            .then(res => {
                console.log(res.data);
                const { sqrs, colorArray, region_size, region_color } = res.data;
                setSquareArray(sqrs);
                setColor(colorArray);
                setLargestColor({
                    name: region_color,
                    regionSize: region_size,
                });
            })
    }
    // useEffect(() => {
    //     getColor(4, 8, 8);
    // }, []);
    // useEffect(() => {
    //     if (squareArray.length > 0) {
    //         let largestColorData = 0;
    //         let colorName = "";

    //         color.forEach(async (el) => {
    //             let params = {}
    //             let largerScore;
    //             params.squares = JSON.stringify(squareArray)
    //             params.color = el
    //             console.log("my param", params);

    //             await axios.post(`http://localhost:5001/colors`,params)
    //                 .then(res => {
    //                     console.log(res.data);
    //                     largerScore = res.data.region_size;
    //                 })

    //             colorName = largestColorData < largerScore ? el : colorName;
    //             largestColorData = largestColorData < largerScore ? largerScore : largestColorData;

    //             setLargestColor({
    //                 name: colorName,
    //                 regionSize: largestColorData,
    //             });
    //         });


    //     }
    // }, [squareArray]);
    return (
        <>
            <div className="input-container" style={{
                marginTop: '50px'
            }}>
                <label>No of Colors</label>:
                <input type="number" name="no_of_colors" value={noOFColors} onChange={(e) => setNoOfColors(e.target.value)} />
                <label>Height</label>:
                <input type="number" name="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                <label>Width</label>:
                <input type="number" name="width" value={width} onChange={(e) => setWidth(e.target.value)} />
                <input type="button" onClick={handleClick} name="submit" value='submit' />
            </div>
            { true && (
                <>
                    <div
                        style={{ display: "flex", margin: "0px", padding: "0px" }}
                        className="App"
                    >

                        <div style={{ display: "flex" }}>
                            {squareArray && squareArray.map((items, index) => {
                                return (
                                    <ul
                                        style={{ listStyleType: "none", margin: "0px", padding: "0px" }}
                                    >
                                        {items.map((subItems, sIndex) => {
                                            return (
                                                <li
                                                    style={{
                                                        border: `1px solid black`,
                                                        backgroundColor: subItems,
                                                        width: "50px",
                                                        height: "50px",
                                                        listStyleType: "none",
                                                    }}
                                                ></li>
                                            );
                                        })}
                                    </ul>
                                );
                            })}
                        </div>
                    </div>
                    <br />
                    <div>
                        {largestColor &&
                            color.map((items) => {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <div
                                            style={{
                                                border: `1px solid black`,
                                                backgroundColor: items,
                                                width: "50px",
                                                height: "50px",
                                                listStyleType: "none",
                                                margin: "10px",
                                            }}
                                        ></div>
                                        <p style={{ padding: "10px" }}>
                                            {`Name: ${items}     ${largestColor.name == items
                                                ? `-  Size :${largestColor.regionSize} ` +
                                                " ==>  This color has the largest Region"
                                                : ""
                                                }`}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </>
            )}
        </>
    );
}