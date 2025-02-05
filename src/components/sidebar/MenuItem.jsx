import { ListItemButton, useTheme } from "@mui/material";
import ListItemBody from "./ListItemBody";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ menu, isDrawerOpen }) => {
  const navigator = useNavigate();
  const theme = useTheme();
  const handleMainMenu = (menu) => {
    navigator(menu.path);
  };

  return (
    <ListItemButton
      onClick={() => handleMainMenu(menu)}
      sx={[
        {
          minHeight: 30,
          px: 2.5,
        },
        isDrawerOpen
          ? {
              justifyContent: "initial",
            }
          : {
              justifyContent: "center",
            },
      ]}
    >
      <ListItemBody menu={menu} isDrawerOpen={isDrawerOpen} />
    </ListItemButton>
  );
};

export default MenuItem;
