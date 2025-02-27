import React, { use, useState } from 'react'
import '../Layout.css'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddFaculty from '../pages/AddFaculty'
function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const location = useLocation()
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-3-fill'
        },
        {
            name: 'Slot Booking',
            path: '/slotbooking',
            icon: 'ri-file-list-fill'
        },
    ];
    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-3-fill'
        },
        {
            name: 'Students',
            path: '/users',
            icon: 'ri-user-line',
        },
        {
            name: "Faculties",
            path: "/faculties",
            icon: "ri-presentation-line"
        },
        {
            name: "Add Faculty",
            path: "/add-faculty",
            icon: "ri-user-add-fill"
        }
    ];
    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1 className='logo'>SB</h1>
                    </div>
                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                            );
                        })}
                        <div className={`d-flex menu-item `} onClick={()=>{
                            localStorage.clear()
                            navigate('/login')
                        }}>
                                <i className='ri-logout-box-fill'></i>
                                {!collapsed && <Link to='login'>Logout</Link>}
                            </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? <i className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(false)}></i> : <i className="ri-close-line header-action-icon" onClick={() => setCollapsed(true)}></i>}
                        <div className='d-flex align-items-center px-4'>
                            <i className="ri-notification-line header-action-icon px-3"></i>
                            <Link className='anchor' to='/profile'>{user?.name}</Link>
                        </div>
                    </div>

                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout