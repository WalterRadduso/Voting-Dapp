import React from "react";

// Image
import loaderImg from "../img/loader.gif";

// CSS
import "./Loading.css";

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
