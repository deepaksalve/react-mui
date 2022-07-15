import React from "react";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FormRadioGroup({
  id,
  name,
  label,
  value,
  options,
  onChange,
  required,
}) {
  return (
    <>
      <FormLabel id={`${id}-label`}>{label}</FormLabel>
      <RadioGroup
        row
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      >
        {options.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            label={o.label}
            control={<Radio size="small" />}
          />
        ))}
      </RadioGroup>
    </>
  );
}
