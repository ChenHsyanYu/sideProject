import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useRef,forwardRef } from "react";
import InputAdornment from '@mui/material/InputAdornment';

const InputBox = forwardRef(({ mode, label, value},ref ) => {

    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField
                inputRef={ref}// ✅ 正確掛載 ref 到 TextField 的 input
                id={mode === "standard" ? "standard-basic" : "outlined-basic"}
                hiddenLabel={mode === "standard"}
                variant={mode === "standard" ? "standard" : "outlined"}
                defaultValue={value}
                // startAdornment={label === 'budget' &&<InputAdornment position="start">$</InputAdornment>}
                label={mode === "standard" ? "" : label}
                fullWidth
            />
        </Box>
    );
})

export default InputBox;
