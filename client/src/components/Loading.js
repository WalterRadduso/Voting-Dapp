import React from "react";

import "./Loading.css";
import loaderImg from "../img/loader.gif";

const Loading = () => {
    return (
        <div className="loading">
            <p>
                Loading...
                <img src={loaderImg} alt="loader" />
            </p>
        </div>
    );
};

export default Loading;
