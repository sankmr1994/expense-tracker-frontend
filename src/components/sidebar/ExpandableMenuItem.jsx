import { Box, Collapse, List, ListItemButton } from "@mui/material";
import React from "react";
import ListItemBody from "./ListItemBody";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ExpandableMenuItem = ({ menu, isDrawerOpen, createMenuList }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <ListItemButton
        sx={[
          {
            minHeight: 30,
            px: 2.5,
          },
          open
            ? {
                justifyContent: "initial",
              }
            : {
                justifyContent: "center",
              },
        ]}
        onClick={handleClick}
      >
        <ListItemBody menu={menu} isDrawerOpen={isDrawerOpen} />
        {menuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <List>
          <Box pl={1}>{createMenuList(menu.items)}</Box>
        </List>
      </Collapse>
    </>
  );
};

export default ExpandableMenuItem;
