import { TextField } from "@mui/material";
import { useField } from "formik";

const TextFieldWrapper = ({ name, isreadOnly = false, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <>
      <TextField
        {...configTextField}
        slotProps={{
          shrink: true,
          input: {
            readOnly: isreadOnly,
          },
        }}
      />
    </>
  );
};

export default TextFieldWrapper;
