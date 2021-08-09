import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

const styles = theme => ({
    title : {marginTop:10,
        marginBottom:30,

    },
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
    right: {
        display:'flex',
        marginRight : 30,
        alignItems:'center'
    },
    icons:{
        width:40,
        height:40,
        textAlign:'center'
    },
    content:{
        display:'flex',
        gap:20
    }
   
});



class ChartList extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const {classes} = this.props;
        const result=[];
        console.log("rendering");
        for(let i in this.props.list){
            let item=this.props.list[i];
            console.log(item.detail);
            result.push(
                <Card key={i} className={classes.card} variant="outlined">
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" style={{fontWeight: 600}}> {item.rank}</Typography>
                        <div>
                        <Typography variant="subtitle1"> {item.title}</Typography>
                        <Typography variant="subtitle2"> {item.artist}</Typography>
                        </div>
                    </CardContent>
                    <div className={classes.right}>
                        {item.detail=="up" && <ExpandLessRoundedIcon className={classes.icons} style={{ color: green[500] }}/>}
                        {item.detail=="down" && <ExpandMoreRoundedIcon className={classes.icons} color="secondary"/>}
                        {item.detail=="same" && <ChevronRightRoundedIcon className={classes.icons} color="action"/>}
                    </div>
                </Card>
            );
        }

        return (
            <div>
                <Typography variant="h6" align='center' className={classes.title} style={{fontWeight: 600}}> Billboard TOP 10 Weekly Chart</Typography>
                {result}
                
            </div>
        );
    }
}

export default withStyles(styles)(ChartList);