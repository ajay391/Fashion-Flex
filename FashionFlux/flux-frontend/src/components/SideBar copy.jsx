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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(isOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <InboxIcon /> },
    // { text: "Products", icon: <ShoppingBagIcon /> },
    // { text: "Customers", icon: <GroupsIcon /> },
  ];

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List sx={{ padding: 0 }}> 
        {/* Dashboard */}
         {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Products Management */}
        <Accordion sx={{ boxShadow: "none", margin: 0, padding: 0, borderTop: "none" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="products-content"
            id="products-header"
            sx={{ margin: 0, padding: "0 16px", borderTop: "none" }}
          >
            <Typography component="span">Products Management</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <List sx={{ padding: 0 }}>
              {["All Products", "Add New Product"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Orders (Fixed Line Issue) */}
        <Accordion sx={{ boxShadow: "none", margin: 0, padding: 0, borderTop: "none" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="orders-content"
            id="orders-header"
            sx={{ margin: 0, padding: "0 16px", borderTop: "none" }} 
          >
            <Typography component="span">Orders</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <List sx={{ padding: 0 }}>
              {["All Orders", "Pending Orders", "Completed Orders"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Customers */}
        <Accordion sx={{ boxShadow: "none", margin: 0, padding: 0, borderTop: "none" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="customer-content"
            id="customer-header"
            sx={{ margin: 0, padding: "0 16px", borderTop: "none" }} 
          >
            <Typography component="span">Customers</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <List sx={{ padding: 0 }}>
              {["All Customers"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
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
}
