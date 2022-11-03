import React from "react";


const curYear = new Date().getFullYear()
console.log(curYear); 

export default function Footer() {

    return <footer>
        <p>Created by Michael J. Kavanagh - © {curYear}</p>
    </footer>

}