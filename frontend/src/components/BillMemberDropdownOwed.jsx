import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';
import memberPic from '../assets/324decd33a2ffe73b52ccb22ec6b29eb.jpg';

// 假設圖片來自 public/assets

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const calculateAmount = (total, divider) => {
  return total / divider;
};

export default function MultipleSelectChip({ total = 1000 }) {
  const theme = useTheme();

  const [members, setMembers] = useState([
    { id: 0, name: 'member1', payAmount: 0 },
    { id: 1, name: 'member2', payAmount: 0 },
    { id: 2, name: 'member3', payAmount: 0 },
  ]);

  const [personName, setPersonName] = useState(members.map((member) => member.name));

  useEffect(() => {
    console.log("Selected Members:", personName);
    console.log("Calculated Amount:", calculateAmount(total, personName.length));

    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        const isSelected = personName.includes(member.name);
        return isSelected
          ? { ...member, payAmount: calculateAmount(total, personName.length) }
          : { ...member, payAmount: 0 }; // 確保未選中的 payAmount 設為 0
      })
    );
  }, [personName, total]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">分款人</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {members.map((member) => (
            <MenuItem
              key={member.id}
              value={member.name}
              style={{ fontWeight: personName.includes(member.name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular }}
            >
              <div>
                <img className='memberPic' src={memberPic} alt="member" />
                <div>
                  {member.name}
                  <p>$ {member.payAmount}</p>
                </div>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
