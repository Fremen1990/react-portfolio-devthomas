import Image from "react-bootstrap/Image";
import React from "react";

export const TechImage = ({ image, title, height, width }) => (
  <li>
    <span className="p-2">
      <Image
        src={image}
        alt={title}
        rounded
        className="image-style1 m-1"
        style={{ height: height, width: width }}
      />
      {title}
    </span>
  </li>
);
