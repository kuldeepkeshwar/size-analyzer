import React, { useState, useRef } from "react";
import useOnClickOutside from "./../hooks/use-on-click-outside";
import MenuIcon from "./../icons/menu";
export default function SideBar(props) {
  const [show, toggle] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => toggle(false));
  return (
    <>
      <div className="slidebar-btn">
        <MenuIcon onClick={() => toggle(!show)} />
      </div>
      {show && (
        <div ref={ref} className="slidebar">
          {props.children}
        </div>
      )}
    </>
  );
}
