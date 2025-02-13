import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { forwardRef } from 'react';
const Calendar = forwardRef(({label, value}, ref) =>{
    
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker 
            label={label} 
            viewRenderers={{
                hours: null,
                minutes: null,
                seconds: null,
            }}
            onChange={(value) => console.log(value)}
            inputRef={ref}
            defaultValue={value}
            format='YYYY/MM/DD'
          />
        </DemoContainer>
      </LocalizationProvider>
    )
})

export default Calendar;