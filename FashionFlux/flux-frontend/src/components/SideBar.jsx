import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const Sidebar = ({ menuItems }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(isOpen);
  };

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List sx={{ padding: 0 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.submenu ? (
              <Accordion sx={{ boxShadow: "none", margin: 0, padding: 0, borderTop: "none" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`${item.text}-content`}
                  id={`${item.text}-header`}
                  sx={{ margin: 0, padding: "0 16px", borderTop: "none" }}
                >
                  <Typography component="span">{item.text}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <List sx={{ padding: 0 }}>
                    {item.submenu.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <ListItemButton component={Link} to={subItem.path}>
                          
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} to={item.path}>
                 
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <i className="ri-menu-line text-[35px] font-black"></i>
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
};

export default Sidebar;
