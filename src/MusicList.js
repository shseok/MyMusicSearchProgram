import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Snackbar} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import SnackbarMsg from './snackmsg';



const styles = theme => ({
    card: {
        boder: '1px solid #ff0000', // for check
        display:'flex',
        justifyContent : 'space-between',
        minWidth: 275,
        maxWidth: 600,
        marginBottom : 20,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    media:{
        height:100,
        width:100,
        border:'1px solid rgba(0, 0, 0, 0.12)'
    },
    right: {
        display:'flex',
        gap : 10,
        alignItems:'center'
    },
    date:{
        fontSize:'0.7rem',
        marginTop: 8
    }
});


class MusicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            likes : {},
            snackbar : {},
        };
        if(this.props.likes){
            this.state.likes=this.props.likes;
        }
        else{
            fetch(`http://localhost:3000/favorite`)
            .then(res=>res.json())
            .then(res=>{
                let {likes} = this.state;
                res.results.map(item => {
                    likes[item.collectionId] = true;
                });
                this.setState({likes});
            }).catch(err => console.log(`error when tab has changed to favorite`));
        }
        
    }

    toggleFavorite = (id, name) => () => {

        let {likes} = this.state;
        if(likes[id] == undefined) {
            likes[id] = true;
        }
        else {
            likes[id] = (likes[id]) ? false : true;
        }
        axios.post('http://localhost:3000/like', {
            id: id,
            likes: likes[id]
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.setState({likes, snackbar : {open : true, msg : `${name} clicked`}});
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({snackbar : {open : false, msg : ''}});
    }   

    render () {
        const {classes} = this.props;
        return (
            <div>
                {this.props.list.map(item => {
                    return (
                    <Card key={item.collectionId} className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle1"> {item.collectionCensoredName}</Typography>
                            <Typography variant="subtitle2"> {item.artistName}</Typography>
                            <Typography variant="body2" className={classes.date}>{item.releaseDate.substring(0,10)} </Typography>
                        </CardContent>
                        <div className={classes.right}>
                        <CardActions>
                            <IconButton onClick={this.toggleFavorite(item.collectionId, item.collectionCensoredName)}>
                            {this.state.likes[item.collectionId] ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </CardActions>
                        <CardMedia
                            className={classes.media}
                            image={item.artworkUrl100}
                            title={item.collenctionName}
                        />
                        </div>
                    </Card>)
                })}
                <SnackbarMsg open={this.state.snackbar.open} message={this.state.snackbar.msg} onClose={this.handleSnackbarClose}></SnackbarMsg>
            </div>
        );
    }
}

export default withStyles(styles)(MusicList);