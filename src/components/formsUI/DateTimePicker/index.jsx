import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useField, useFormikContext } from "formik";

const DateTimePickerWrapper = ({ name, ...otherProps }) => {
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

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          format="DD/MM/YYYY H:mm:ss"
          onClose={() => {
            setFieldTouched(name, true, false);
            validateField(name);
          }}
          onChange={(value) => {
            setFieldTouched(name, true);
            setFieldValue(name, value, true);
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

export default DateTimePickerWrapper;
