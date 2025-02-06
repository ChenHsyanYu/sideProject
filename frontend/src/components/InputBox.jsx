import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import { useEffect } from 'react';
const InputBox = ({mode,label,defaultValue}) =>{
    
    const showMode = mode === 'standard'? <TextField id="standard-basic" hiddenLabel variant="standard" defaultValue={defaultValue}/> : <TextField id="outlined-basic" label={label} variant="outlined" defaultValue={defaultValue}/>
    

    return(
        <>

            <Box
                component="form"
                // sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                {showMode}
                
            </Box>
        </>
    )
}

export default InputBox;