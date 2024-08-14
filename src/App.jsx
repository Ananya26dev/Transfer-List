import { useState } from "react";
import "./App.css";
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}
const App = () => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const customList = (items) => (
    <div className="list">
      <ul>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <li key={value}>
              <input
                type="checkbox"
                id={labelId}
                onClick={() => handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
              />
              <label htmlFor={labelId}>List Item {value + 1}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className="App">
      <div className="transfer-list">
        <div className="list-container">{customList(left)}</div>
        <div className="buttons-container">
          <button onClick={handleAllRight}>&gt;&gt;</button>
          <button
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </button>
          <button onClick={handleAllLeft}>&lt;&lt;</button>
          <button
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </button>
        </div>
        <div className="list-container">{customList(right)}</div>
      </div>
    </div>
  );
};

export default App;
