import { Typography, Grid, Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import React,{useContext} from 'react'
import useStyles from './Styles';
import Form from '../Form/Form';
import List from '../List/List';
import {ExpenseTrackerContext} from '../../Context';
function Main() {
    const classes = useStyles();
    const { balance } = useContext(ExpenseTrackerContext);
  return (
    <div>
      <Card >
          <CardHeader title='Expense Tracker' subheader="Powered by Speechly" />
          <CardContent>
              <Typography align="center" variant="h5">TotalBalance : &#8377;{balance}</Typography>
              <Typography variant="subtitle2" style={{color:'#9e9e9e'}} >Saying : Add income of category salary of amount 500 on date next monday</Typography>
              <Divider />
              <Form/>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List/>
                    </Grid>

                </Grid>
            </CardContent>
          </CardContent>
      </Card>

    </div>
  )
}

export default Main
