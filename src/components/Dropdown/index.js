import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  id,
  name,
  required,
}) {
  return (
    <>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        labelId={`${id}-label`}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((o, idx) => (
          <MenuItem key={idx} value={o.value}>
            {o.text}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
