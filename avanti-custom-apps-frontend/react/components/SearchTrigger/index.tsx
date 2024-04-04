import React, { useState } from "react";
import { useCssHandles } from 'vtex.css-handles'
import { SearchIcon, CloseIcon } from "./icons";

export const cssHandles = [
  'swp-container-wrapper',
  'swp-container-icon-wrapper',
  'swp-container-wrapper',
  'swp-content-wrapper',
  'swp-container-icon-close-wrapper',
  'swp-icon-close',
  'swp-icon-search',
  'swp-content'
] as const

type Props = {
  children: React.ReactNode;
};

export const SearchWrapper = ({ children }: Props) => {
  const { handles: css } = useCssHandles(cssHandles)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={css["swp-container-wrapper"]}>
        {!show && (
          <div className={css["swp-container-icon-wrapper"]}>
            <button className={css['swp-icon-search']} onClick={handleShow}>
              <SearchIcon />
            </button>
          </div>
        )}
        {show && (
          <div
            className={css["swp-container-wrapper"]}
            onClick={handleClose}
          >
            <div
              className={css["swp-content-wrapper"]}
              onClick={handleClose}
            >
              <div
                className={css["swp-container-icon-close-wrapper"]}
              >
                <button className={css['swp-icon-close']} onClick={handleClose}>
                  <CloseIcon />
                </button>
              </div>
              <div
                className={css["swp-content"]}
                onClick={(event) => event.stopPropagation()}
              >
                {children}
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};
