import React, {createContext, useReducer, useEffect} from 'react';
import axios from 'axios';
const intialState = [];
export const ExpenseTrackerContext = createContext(intialState);

const reducer = (state,action) => {
    let transactions;

    switch(action.type) {
        case "FETCH_TRANSACTION" :
            transactions = [...action.payload]
            console.log({transactions});
            return transactions;

        case "DELETE_TRANSACTION":
            transactions = state.filter((t)=> t.id != action.payload);
            console.log(action.payload);
            axios.delete('http://localhost:4000/deletetransaction?id='+action.payload)
            return transactions;

        case 'ADD_TRANSACTION':
            transactions = [action.payload,...state];
            console.log({transactions});
            axios.post('http://localhost:4000/addtransaction',transactions);
            return transactions;

        default:
            return transactions;
    }
}

export const Provider = ({ children }) =>{
    const [transactions, dispatch] = useReducer(reducer,intialState);

    const deleteTransaction = (id)=>{
        dispatch({type : 'DELETE_TRANSACTION', payload: id});
    }

    const addTransaction = (transaction)=>{
        dispatch({type : 'ADD_TRANSACTION', payload: transaction})
        console.log(transaction);
    }

    const fetchTransactions = async()=>{
        let response = await axios.get('http://localhost:4000/gettransactions');
        console.log(...response.data.data);
        dispatch({type : 'FETCH_TRANSACTION', payload: response.data.data})
        // response.data.data.map((obj)=>{addTransaction(obj);
        // console.log(obj);});
    }

    useEffect(()=>{
        fetchTransactions();
    },[])

    const balance = transactions.reduce((acc,current)=>{
        return (current.type == 'Expense' ? acc-current.amount : acc+current.amount)
    },0);
    console.log({balance})
    
    return(
        <ExpenseTrackerContext.Provider value={{deleteTransaction,addTransaction,transactions, balance}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
