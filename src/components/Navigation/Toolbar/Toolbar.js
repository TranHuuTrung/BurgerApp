import React from 'react';
import classes from './Toolbar.css';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className={classes.Toolbar} style={{justifyContent: 'space-between', display:'flex'}}>
        <DrawerToggle clicked={props.sideDrawerToggle}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.DesktopOnly}>
            <NavigationItems />
        </div>
    </header>
);

export default Toolbar;