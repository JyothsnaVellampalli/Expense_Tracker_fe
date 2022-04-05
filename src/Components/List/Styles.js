import { makeStyles } from '@material-ui/core/styles';
import {red, green} from '@material-ui/core/colors';

export default makeStyles(()=>({
    avatarIncome :{
        backgroundColor : green[500],
        color : '#fff',
    },
    avatarExpense:{
        color : '#fff',
        backgroundColor : red[500],
    },
    list : {
        overflow : 'auto',
        maxHeight : '150px',
        // border : '1px solid',
        width : '100%',

    },
    
}))