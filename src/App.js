
import './App.css';
import Details from './Components/Details/Details';
import Main from './Components/Main/Main';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './Styles';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel} from "@speechly/react-ui";


function App() {
  const classes = useStyles();
  return (
  <div>
    
    <Grid container className={classes.grid} spacing={0} alignItems="center" justifyContent='center' style={{height:'100vh'}}>
      <Grid item xs={12} sm={3}>
        <Details title="Income"/>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Main/>
      </Grid>
      <Grid item xs={12} sm={3}>
      <Details title="Expense"/>
      </Grid>
    </Grid>
    <PushToTalkButtonContainer>
      <PushToTalkButton />
      <ErrorPanel />
    </PushToTalkButtonContainer>
    
  </div>
  )
}

export default App;
