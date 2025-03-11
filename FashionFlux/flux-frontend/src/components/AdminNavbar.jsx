import React from 'react'

import SideBar from '../components/SideBar'
import { Link } from "react-router-dom"

import avatarImg from "../assets/avatar.png"

import InboxIcon from "@mui/icons-material/MoveToInbox";

// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups"; // ✅ CORRECT
// import GroupsIcon from "@mui/icons-material/Groups";

const AdminNavbar = () => {


   
const adminMenuItems = [
    { text: "Dashboard", icon: <InboxIcon />, path: "/admin/dashboard" },
    {
      text: "Products Management",
      submenu: [
        { text: "All Products", path: "/admin/products" },
        { text: "Add New Product", path: "/admin/products/new" },
      ],
    },
    {
      text: "Orders",
      submenu: [
        { text: "All Orders", path: "/admin/orders" },
        { text: "Pending Orders", path: "/admin/orders/pending" },
      ],
    },
    { text: "Customers", icon: <GroupsIcon />, submenu: [{ text: "All Customers", path: "/admin/customers" }] },
  ];
  
    
  return (
    <header className='fixed-nav-bar w-nav'>
        <nav className="max-w-screen-2xl mx-auto px-2 py-2 flex justify-between items-center">
        {/* <ul className="nav__links"> */}
            <div className='flex-1'>
                <SideBar menuItems={adminMenuItems}/>

            </div>
        {/* </ul> */}
            <div className="nav__logo">
                <Link to="/">FashionFlux</Link>
            </div>
            <div className="nav__icons relative">
                    
                <span>
                <img 
                    src={avatarImg} alt="" 
                    className="size-6 rounded-full cursor-pointer" 
                    
                    />
                </span>
            </div>
        </nav>
    </header> 
  )
}

export default AdminNavbar