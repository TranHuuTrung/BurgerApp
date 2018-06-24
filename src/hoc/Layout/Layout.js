import React, { Component } from 'react';
import classes from './Layout.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer});
    }
    render(){
        return (
            <Aux>
                <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

export default Layout;