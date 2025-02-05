import { ListItemIcon, ListItemText } from "@mui/material";

const ListItemBody = ({ menu, isDrawerOpen }) => {
  return (
    <>
      <ListItemIcon
        sx={[
          {
            minWidth: 0,
            justifyContent: "center",
          },
          isDrawerOpen
            ? {
                mr: 1.5,
              }
            : {
                mr: "auto",
              },
        ]}
      >
        {menu.icon}
      </ListItemIcon>
      <ListItemText
        primary={menu.title}
        sx={[
          isDrawerOpen
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
              },
        ]}
      />
    </>
  );
};

export default ListItemBody;
