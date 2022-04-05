import { List as MUIList, ListItemAvatar, ListItem, Avatar, Slide,ListItemSecondaryAction, ListItemText, IconButton, Typography} from '@material-ui/core';
import {MoneyOff, Delete} from '@material-ui/icons';
import React,{useContext} from 'react';
import useStyles from './Styles';
import {ExpenseTrackerContext} from '../../Context';

function List() {
    const classes = useStyles();
    const { deleteTransaction,transactions } = useContext(ExpenseTrackerContext);

    // const transactions =[
    //     {id :1, type:"Income", category:'salary', amount:50, date:'Thu Mar 31 2022' },
    //     {id :2, type:"Expense", category:'salary', amount:50, date:'Thu Mar 31 2022' },
    //     {id :3, type:"Income", category:'salary', amount:50, date:'Thu Mar 31 2022' }
    // ];
    
  return (
      <div id='list'>
    <MUIList dense={false} className={classes.list}>
        {transactions.map((transaction)=>(
            <Slide directon='down' in mountOnEnter unmountOnExit key={transaction.id}>
                <ListItem className={classes.listitem} key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar className={transaction.type == 'Income'? classes.avatarIncome : classes.avatarExpense}>
                            <MoneyOff/>
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={`${transaction.category} - Rs.${transaction.amount}`} secondary={`${transaction.date}`} />
                    
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{deleteTransaction(transaction.id)}}>
                      <Delete/>
                    </IconButton>
                    </ListItemSecondaryAction>
    
                </ListItem>
            </Slide>
        ))}
    </MUIList>
    </div>
  )
}

export default List
