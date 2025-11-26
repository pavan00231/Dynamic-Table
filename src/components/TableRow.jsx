import React from "react";

const TableRow = React.memo(
  function TableRow({ char, checked, onCheck }) {

    return (
      <tr>
        <td>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onCheck(char.id)}
          />
        </td>
        <td>{char.name}</td>
        <td>{char.location}</td>
        <td>{char.health}</td>
        <td>{char.power}</td>
      </tr>
    );
  },

  // 👇 CUSTOM COMPARISON 
  (prev, next) => {
    // Re-render ONLY IF:
    // - char object changes (rare)
    // - OR checkbox for this row changes
    return (
      prev.checked === next.checked &&
      prev.char === next.char
    );
  }
);

export default TableRow;
