import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9.99976C18 14.418 14.4183 17.9998 10 17.9998C5.58172 17.9998 2 14.418 2 9.99976C2 5.58148 5.58172 1.99976 10 1.99976V-0.000244141C4.47715 -0.000244141 0 4.47691 0 9.99976C0 15.5226 4.47715 19.9998 10 19.9998C15.5228 19.9998 20 15.5226 20 9.99976H18Z"
        fill="#2BB24C"
      />
    </svg>
  </div>
);

export default LoadingSpinner;
