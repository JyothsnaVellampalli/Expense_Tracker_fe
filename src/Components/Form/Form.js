import React,{useState,useEffect,useContext} from 'react';
import {Typography,FormControl,InputLabel,MenuItem,Select,Grid,TextField,Button} from '@material-ui/core';
import useStyles from './Styles';
import {ExpenseTrackerContext} from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import {incomeCategories, expenseCategories} from '../Categories';
import {useSpeechContext} from '@speechly/react-client';

let intialState = {
    amount: '', category: '', type: '', date:new Date()
}


function Form() {
    const classes = useStyles();
    const [formData, setFormData] = useState(intialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();

    useEffect(()=>{
        console.log({formData});
        },[formData])

    const createTransaction=()=>{
        if(Number(formData.amount) === NaN && !formData.date.includes('-')) return;
        const transaction = {...formData, amount: Number(formData.amount), id:uuidv4() };
        console.log({transaction});
        addTransaction(transaction);
        setFormData(intialState);
    }

    useEffect(()=>{
        if(segment){
            
            if(segment.intent.intent === 'add_expense'){
                console.log('add_expense');
                setFormData({...formData,type: 'Expense'});
            }else if(segment.intent.intent === 'add_income'){
                console.log('add_income');
                setFormData({...formData,type: 'Income'});
                
            }else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction();
            }else if(segment.isFinal && segment.intent.intent === 'cancle_transaction'){
                return setFormData(intialState)
            }
        segment.entities.forEach((e)=>{
            switch(e.type){
                case 'amount':
                    setFormData({...formData, amount:e.value});
                    
                    break;
                case 'category':
                    let category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                    setFormData({...formData, category});
                    
                    break;
                case 'date':
                    setFormData({...formData, date:e.value});
                    
                    break;
                default:
                    break;
            }
        })
        if(segment.isFinal && formData.type && formData.category && formData.amount && formData.date){
            createTransaction();
        }
        }
    },[segment])

    const selectedCategory = formData.type=='Income' ? incomeCategories : expenseCategories

    return (
    <div>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography align="center" variant="subtitle2" gutterBottotm>
                {segment && segment.words.map((b)=>b.value).join(' ')}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e)=>setFormData({...formData, type:e.target.value})}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e)=> setFormData({...formData, category: e.target.value})}>
                    {/* <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Salary">Salary</MenuItem> */}
                    {selectedCategory.map((c)=>
                    <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField type='number' label="Amount" fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})}/>
        </Grid>
        <Grid item xs={6}>
            <TextField type='date' label="Date" fullWidth value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} />
        </Grid>
     
    <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
    </div>
  )
}

export default Form
