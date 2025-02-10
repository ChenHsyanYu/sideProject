// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import memberPic from '../assets/324decd33a2ffe73b52ccb22ec6b29eb.jpg';
import '../css/dropdown.css';

export default function EditBillDropdownPaid({selectedValue}) {
  const [payer, setPayer] = useState("");
  const members = [
    {
        id: 0,
        name: 'member1',
    },
    {
        id: 1,
        name: 'member2',
    },
    {
        id: 2,
        name: 'member3',
    }
];

  const handleChange = (event) => {
    setPayer(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth  disabled={selectedValue === 'personal'}>
        <InputLabel id="demo-simple-select-label">付款人</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={payer}
          label="Pay by"
          onChange={handleChange}
        >
          {members.map((member)=> 
            <MenuItem value={member.id}>
              <div className='dropdownMenu'>
                <img className='memberPic' src={memberPic}></img>
                    <div>
                        {member.name}
                    </div>
                    
                </div>
            </MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
