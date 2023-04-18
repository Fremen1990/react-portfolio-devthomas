import Button from "react-bootstrap/Button";
import React from "react";


export const ButtonAbout = ({ href, newTab, title, variant}) => {
    return (
        <a href={href}
           target={newTab ? "_blank" : "_self"}
           rel="noopener noreferrer"
        >
            <Button className="m-2" variant={variant}>
                {title}
            </Button>
        </a>
    );
}