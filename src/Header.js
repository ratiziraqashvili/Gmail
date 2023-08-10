import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

const Header = () => {

const dispatch = useDispatch();

const user = useSelector(selectUser);

const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        }) 
    }

  return (
    <div className='header'>
        <div className="header_left">
            <IconButton>
            <MenuIcon />
            </IconButton>
            <img src='https://businesspost.ng/wp-content/uploads/2021/09/Gmail.jpg' alt="" />
        </div>
        <div className="header_middle">
            <SearchIcon />
            <input type="text" placeholder='Search mail' />
            <ArrowDropDownIcon className='header_inputCaret' />
        </div>    
        <div className="header_right">
            <IconButton>
                <AppsIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <Avatar onClick={signOut} src={user?.photoUrl} className='avatar' />
        </div>   
    </div>
  )
}

export default Header