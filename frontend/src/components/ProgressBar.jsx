import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarSet = ({expense, budget,mode}) => {
    const [expensePercentage,setExpense] = useState(Math.round((expense/budget)*100))
    const [budgetPercentage,setBudget] = useState(0)
    const [labels,setLabels] = useState([`$-${expense}`,`$${budget-expense}`])
    console.log(`expensePercentage: ${expensePercentage} , budgetPercentage: ${budgetPercentage}`)
    useEffect(() => {
        setExpense(Math.round((expense/budget)*100))
        setBudget(100-expensePercentage)
    },[expense])
    
    useEffect(() => {
        if(mode === 'percentage'){
            // setExpense(expense/budget);
            setBudget(0)
            setLabels(["",""])
        }
    },[mode])
    
    return (
      <>
        <ProgressBar>
            <ProgressBar variant="success" now={expensePercentage} label={labels[0]} key={1} />
            <ProgressBar variant="warning" now={budgetPercentage}  label={labels[1]} key={2} />
            {/* <ProgressBar striped variant="danger" now={10} key={3} /> */}
        </ProgressBar>
      </>
    );
  }

export default ProgressBarSet;