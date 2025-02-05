import { Button } from "@mui/material";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const configButton = {
    color: "primary",
    variant: "contained",
    ...otherProps,
  };

  return (
    <>
      <Button {...configButton}>{children}</Button>
    </>
  );
};

export default ButtonWrapper;
