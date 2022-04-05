import {useContext} from 'react';
import { ExpenseTrackerContext } from '../Context';
import {incomeCategories, expenseCategories, resetCategories} from './Categories';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const useTransactions = (title)=>{
    //title = income/expense
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t)=>t.type==title);
    const total = transactionsPerType.reduce((acc,current)=> acc+=current.amount,0);
    const categories = title=='Income' ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t)=>{
        const category = categories.find((c)=>c.type == t.category)
        if(category){category.amount += t.amount;}
    });
    const filteredCategories = categories.filter((c)=>c.amount>0);

    const chartData = {
        labels : filteredCategories.map((c)=>c.type),
        datasets: [{
            data : filteredCategories.map((c)=>c.amount),
            backgroundColor : filteredCategories.map((c)=>c.color),
            radius : '40%',
        }],
    }
    return { total, chartData, filteredCategories}
}

export default useTransactions;