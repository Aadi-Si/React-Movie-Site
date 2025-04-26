import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" onChange={func} id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
