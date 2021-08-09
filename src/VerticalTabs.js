import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Typography, TextField, Button} from '@material-ui/core';
import MusicList from './MusicList';
import ChartList from './ChartList';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: '100vh',
        width: '100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    panels:{
        flexGrow:1
    }
});

class VerticalTabs extends React.Component  {// function => class
    constructor(props) {
            super(props);
        this.state = {
            value: 0,
            music_list: {},
            like_list: {},
            char_list: {},
            searchWord: '',
            replaceWord: '',
            limit: 10,
            offset: 0,
        },
        this.likes={}
    }

    handleSearchTextChange = (event) => {
        //console.log(event.target.value);
        this.setState({ searchWord: event.target.value });
    }

    handleSearch = (event) => {
        event.preventDefault();
        console.log(this.state.searchWord);
        fetch(`http://localhost:3000/musicSearch/${this.state.searchWord}/${this.state.offset}/${this.state.limit}`)
            .then(r => r.json())
            .then(r => {
            console.log(r);
            this.setState({ music_list: r.results, replaceWord: this.state.searchWord ,searchWord: '' });
        }).catch(e => console.log('error when search musician'));
    }

    a11yProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    handleChange = (event, newValue) => {
        console.log("this is new Value");
        if(newValue==1){
            fetch(`http://localhost:3000/favorite`)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                res.results.map(item => {
                    this.likes[item.collectionId] = true;
                });
                this.setState({like_list:res.results});
            }).catch(err => console.log(`error when tab has changed to favorite`));
        }
        else if(newValue==2){
            fetch(`http://localhost:3000/chart`)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                this.setState({chart_list:res});
            })
        }
        this.setState({ value: newValue });
    }

    fetchMoreData = (e) => {
        this.setState({ offset: this.state.offset + this.state.limit });
        fetch(`http://localhost:3000/musicSearch/${this.state.replaceWord}/${this.state.offset}/${this.state.limit}`)
            .then(r => r.json())
            .then(r => {
            console.log(r);
            this.state.music_list.forEach((a_music) => {
                r.results.forEach((r_music, i) => a_music.collectionId === r_music.collectionId ? r.results.splice(i, 1) : r_music);
            }); // on edit... : Version diff
            setTimeout(() => {
                this.setState({ music_list : this.state.music_list.concat(r.results) });
            }, 800);
        }).catch(e => console.log('error when search musician'));
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    style={{overflow:'visible'}}
                >
                    <Tab label="Album Search" {...this.a11yProps(0)} />
                    <Tab label="Favorite" {...this.a11yProps(1)} />
                    <Tab label="Chart" {...this.a11yProps(2)} />
                </Tabs>
                <TabPanel value={this.state.value} index={0}>
                    <form style={{ display: 'flex', marginBottom: 20 }}>
                        <div style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', }}>
                            <TextField variant="outlined" label="Music Album Search" type="search" style={{ width: 450 }}
                                onChange={this.handleSearchTextChange} value={this.state.searchWord}>

                            </TextField>
                            <Button variant="contained" color="primary" type="submit" onClick={this.handleSearch} style={{ marginLeft: 20 }}>
                                Search
                            </Button>
                        </div>
                    </form>
                    <div style={{marginLeft:'auto', marginRight:'auto'}}>
                        {this.state.music_list && this.state.music_list.length > 0 &&
                            <InfiniteScroll dataLength={this.state.music_list.length} next={this.fetchMoreData} hasMore={true}>
                            <MusicList list={this.state.music_list} /></InfiniteScroll>
                        }
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                <div style={{marginLeft:'auto', marginRight:'auto'}}>
                        {this.state.like_list && this.state.like_list.length > 0 &&
                            // <InfiniteScroll dataLength={this.state.like_list.length} next={this.fetchlikeData} hasMore={true}>
                            <MusicList list={this.state.like_list} likes={this.likes}/>
                            // </InfiniteScroll>
                        }
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={2} >
                    <div style={{marginLeft:'auto', marginRight:'auto'}}>
                        {this.state.chart_list &&
                            <ChartList list={this.state.chart_list}>

                            </ChartList>
                        }
                    </div>
                </TabPanel>
            </div>
        );
    }
}

class TabPanel extends React.Component { // function => class
  // const tempStyle = {
  //     height:"100%",
  //     background:"skyblue",
  // }
    
    render(){
        
        return (
            <div
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`vertical-tabpanel-${this.props.index}`}
                aria-labelledby={`vertical-tab-${this.props.index}`}
                style={{width:window.outerWidth-300}}
            >
                {this.props.value === this.props.index && (
                    <Box >
                        {this.props.children}
                    </Box>
                )}
            </div>
        );
    };
}

export default withStyles(styles)(VerticalTabs);
