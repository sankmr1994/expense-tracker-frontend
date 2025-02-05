const HandleRegisterationErrors = ({ errorCode, message }, onSubmitProps) => {
  switch (errorCode) {
    case 99: {
      const fieldName = message[0].split("-")[0];
      const errorMsg = message[0].split("-")[1];
      if (fieldName === "dateOfBirth")
        onSubmitProps.setFieldError("dob", errorMsg);
      if (fieldName === "userName") {
        onSubmitProps.setFieldError("userName", errorMsg);
      }
      break;
    }
    case 100:
      onSubmitProps.setFieldError("userName", message);
      break;
    case 101:
      onSubmitProps.setFieldError("email", message);
      break;
  }
};

export default HandleRegisterationErrors;
