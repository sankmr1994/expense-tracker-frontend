import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useField, useFormikContext } from "formik";

const DatePickerWrapper = ({ name, handleMonthChange, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched, validateField, setFieldError } =
    useFormikContext();

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  const handleChange = (value) => {
    if (meta && !meta.error) {
      handleMonthChange(value);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onClose={() => {
            setFieldTouched(name, true, false);
            validateField(name);
          }}
          onChange={(value) => {
            setFieldTouched(name, true);
            setFieldValue(name, value, true);
            handleChange(value);
          }}
          {...otherProps}
          slotProps={{
            textField: {
              ...configDateTimePicker,
              onChange: (value) => {
                setFieldValue(name, value, true);
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerWrapper;
