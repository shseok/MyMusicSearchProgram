import React from 'react';
//import './App.css';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {AppBar, Typography, TextField, Button, Input} from '@material-ui/core';
//import Toolbar from '@material-ui/core/Toolbar';
//import MenuIcon from '@material-ui/icons/Menu';
//import IconButton from '@material-ui/core/IconButton';
//import ExitToApp from '@material-ui/icons/ExitToApp';
//import Drawer from '@material-ui/core/Drawer';
//import Forms from './Forms';
//import HomeIcon from '@material-ui/icons/Home';
//import Typography from '@material-ui/core/Typography';
import MusicList from './MusicList';
import VerticalTabs from './VerticalTabs';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     music_list: {},
        //     searchWord: '',
        // }
    }

    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Typography align="center" variant="h4" color="inherit">My Favorite Musics</Typography>
                </AppBar>
                <div style={{ height: 60, width: '100%' }}></div>
                <div style={{ display: 'flex', width: '100%'}}>
                    <div>
                        <VerticalTabs />
                    </div>
                </div>
            </div>
        );
    }
}
