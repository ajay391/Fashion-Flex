import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CartModal from "../pages/shop/CartModal";
// import { IoSearch } from "react-icons/io5";
// import { FaShoppingBag } from "react-icons/fa";

import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {

    const products = useSelector((state) => state.cart.products);

    const [isCartOpen , setisCartOpen] = useState(false);

    const handleCartToggle = () =>{
        setisCartOpen(!isCartOpen)
    }

    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth)

    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    // console.log(user)
    // console.log(products)

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen)
    }

    const adminDropDownMenus = [
        {label: "Dashboard", path: "/admin/dashboard"}
    ]

    const userDropDownMenus = [
        {label: "Dashboard", path: "/dashboard"},
        {label: "Profile", path: "/dashboard/profile"},
        {label: "Payments", path: "/dashboard/payments"},
        {label: "Orders", path: "/dashboard/orders"}
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            navigate('/')
        }catch(error){
            console.error("Failed to logout" , error)
        }
    }

    return (
        
        <header className='fixed-nav-bar w-nav shadow-[0_2px_3px_rgba(0,0,0,0.2)]'>
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                <ul className="nav__links">
                    <li className="link"><Link to='/'>Home</Link></li>
                    <li className="link"><Link to='/shop'>Shop</Link></li>
                    <li className="link"><Link to='/pages'>Pages</Link></li>
                    <li className="link"><Link to='/contact'>Contact</Link></li>
                </ul>

                {/* logo */}

                <div className="nav__logo">
                    <Link to="/">FashionFlux</Link>
                </div>

                <div className="nav__icons relative">
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button onClick={handleCartToggle} className="hover:text-primary relative mx-[10px]">
                            <i className="ri-shopping-bag-3-line text-[20px]"></i>
                            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-black text-center absolute left-[10px] top-[-3px]">{products.length}</sup>
                        </button>
                    </span>

                    <span>
                        {
                            user? (<>
                            <img 
                            src={user?.profileImage || avatarImg} alt="" 
                            className="size-6 rounded-full cursor-pointer" 
                            onClick={handleDropDownToggle}
                            />
                            {
                                isDropDownOpen && (

                                <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" >
                                    <ul className="font-medium space-y-4">
                                        {dropdownMenus.map((menu,index) => (
                                            <li key={index}>
                                                <Link onClick={()=> setIsDropDownOpen(false)} className="dropdown-items" to={menu.path}>{menu.label}</Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link onClick={handleLogout} className="dropdown-items">Logout</Link>
                                        </li>
                                    </ul>
                                </div>

                            )
                            }
                            
                            </>): (<Link to="login">
                                <i className="ri-user-line"></i>
                            </Link>)
                        }
                        
                    </span>
                </div>
            </nav>

            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
            }



        </header>
       
    )
}

export default Navbar