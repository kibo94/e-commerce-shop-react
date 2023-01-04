import React , {useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Items } from '../../../components/items/Items';
import "../Admin.scss"
interface AdminItemsProps {
  isAdmin:boolean;
}
const AdminItems = ({isAdmin} : AdminItemsProps) => {
  const [itemType, setItemType] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    const itemType = event.target.value as string;
  
    setItemType(itemType);

  };
  useEffect(() => {

  },[itemType])
  return (
<>
<Box sx={{ width: 220 }} color="black" className='select' >
<FormControl fullWidth color='primary' >
  <InputLabel id="demo-simple-select-label"></InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={itemType}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={"laptops"}>Laptops</MenuItem>
    <MenuItem value={"vegetables"}>Vegetables</MenuItem>
    <MenuItem value={"fruits"}>Fruits</MenuItem>
  </Select>
</FormControl>
</Box>
{itemType ? <Items type={itemType} isAdmin={isAdmin}/> : null}
</>

  )
}

export default AdminItems