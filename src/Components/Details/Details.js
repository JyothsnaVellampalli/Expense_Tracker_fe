import React from 'react';
import {Typography, Card, CardContent, CardHeader, Box} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './Styles';
import useTransactions from '../useTransaction';

function Details({title}) {
  const classes = useStyles();
  const {total, chartData, filteredCategories} = useTransactions(title);
  return (
    <div>
      <Card className={classes.income}>
        <CardHeader title={title} style={{color:'#757575'}}/>
        <CardContent>
          <Typography variant='h5' style={{marginTop:'-25px', color:'#4fc3f7'}}>&#8377;{total}</Typography>
          <Box display='flex' flexDirection='row' flexWrap="wrap" p={1} m={1} bgColor='background.paper'>
          {filteredCategories.map((c)=>
          <Box style={{backgroundColor:c.color}} p={1} className={classes.label}>{c.type}</Box>)}
          </Box>
          <div style={{marginTop:'-100px', marginBottom: '-100px'}}>
          <Doughnut data={chartData}/>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default Details
