import React from "react";

import "./Footer.css";

const Footer = ({account}) => {
    return (
        <div className="footer">
            <p>
                Your account: <span>{account}</span>
            </p>
        </div>
    );
};

export default Footer;
