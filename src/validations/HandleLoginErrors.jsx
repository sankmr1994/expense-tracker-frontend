import HandleJwtError from "./HandleJwtError";

const HandleLoginErrors = (
  { errorCode, message },
  onSubmitProps,
  navigator,
  dispatch
) => {
  switch (errorCode) {
    case 102:
      onSubmitProps.setFieldError("userNameOrEmail", message);
      break;
    case 103:
      onSubmitProps.setFieldError("password", message);
      break;
    case 104: {
      HandleJwtError(errorCode, navigator, dispatch);
      break;
    }
  }
};

export default HandleLoginErrors;
