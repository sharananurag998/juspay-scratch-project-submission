import React from "react";

export default function Icon({ name, size = 20, className = "", onClick }) {
  return (
    <svg
      className={`fill-current ${className}`}
      width={size.toString() + "px"}
      height={size.toString() + "px"}
      onClick={onClick}
    >
      <use xlinkHref={`/icons/solid.svg#${name}`} />
    </svg>
  );
}
