import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import data from "./size-plugin.json";
import Chart from "./components/Chart";
import { datetoString } from "./utils";
import SideBar from "./components/SideBar";

const height = window.innerHeight - 100;
const width = window.innerWidth - 100;

function App(props) {
  const [sizes, setSize] = useState(props.sizes);
  function toggleSize(s) {
    setSize(
      sizes.map(size => {
        if (s === size) {
          size.selected = !size.selected;
        }
        return size;
      })
    );
  }
  return (
    <>
      <SideBar>
        <div>
          <h3>Compare</h3>
          {sizes.map(size => {
            return (
              <div
                key={size.timestamp}
                className="item"
                onClick={() => toggleSize(size)}
              >
                <input type="checkbox" checked={size.selected} />
                <span>{datetoString(size)}</span>
              </div>
            );
          })}
        </div>
      </SideBar>
      <Chart
        sizes={sizes.filter(s => s.selected)}
        height={height}
        width={width}
      />
    </>
  );
}
ReactDOM.render(
  <App sizes={data.map(size => (size.selected = true && size))} />,
  document.getElementById("root")
);
