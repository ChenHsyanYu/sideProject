import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import memberPic from '../assets/324decd33a2ffe73b52ccb22ec6b29eb.jpg';
import '../css/dropdown.css';
import { useSelector } from 'react-redux';

const EditBillDropdownPaid = ({ selectedValue, members, defaultPayer }) => {

  // 设置初始 payer
  const [payer, setPayer] = useState(()=>
    members.find((member) => member.id === defaultPayer.id) || members[0] || ""
  );

  // 处理选项变化
  const handleChange = (event) => {
    setPayer(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={selectedValue === 'personal'}>
        <InputLabel id="demo-simple-select-label">付款人</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultChecked={payer}
          label="Pay by"
          onChange={handleChange}
        >
          {members.map((member) => (
            <MenuItem key={member.id} value={member}>
              <div className='dropdownMenu'>
                <img className='memberPic' src={memberPic} alt="member" />
                <div>{member.memberName}</div>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EditBillDropdownPaid;
