import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";

const RadioButtonWrapper = ({ name, options, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configRadioButton = {
    ...otherProps,
    ...field,
  };

  return (
    <Box>
      <RadioGroup {...configRadioButton} name={name} row>
        {options.map((option) => (
          <FormControlLabel
            {...configRadioButton}
            key={option.key}
            value={option.value}
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
              />
            }
            label={option.key}
          />
        ))}
      </RadioGroup>
      {meta && meta.touched && meta.error && (
        <FormHelperText error sx={{ ml: 1, mt: "4px" }}>
          {meta.error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default RadioButtonWrapper;
