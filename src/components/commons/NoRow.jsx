import { Skeleton, Typography } from "@mui/material";

const NoRow = ({ isLoadingData }) => {
  return isLoadingData ? (
    <Skeleton variant="rectangular" height="50vh" animation="wave" />
  ) : (
    <Typography padding={2}>No rows</Typography>
  );
};

export default NoRow;
