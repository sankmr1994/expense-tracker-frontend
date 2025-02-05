import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const value = e.target.value;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <>
      <TextField {...configSelect}>
        {options?.map((item) => {
          return (
            <MenuItem key={item[0]} value={item[0]}>
              {item[1]}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
};

export default SelectWrapper;
