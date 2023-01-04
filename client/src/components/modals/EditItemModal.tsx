import React , {useState} from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import { EditModalProps } from '../../models/EditModalProps';
const EditItemModal = ({ item, closeModal, onChangeItemName ,updateItem }:EditModalProps) => {
  // const [plusMinus,setPlusMinus] = useState(quantity)
  const onChangePlusMinus = (e:any) => {
    //  setPlusMinus(e.target.value)
  }
    return (
      <div className="editModal">
        <ClearIcon onClick={closeModal} />
        <input value={item.name} onChange={onChangeItemName} name="name"/>
        <input value={item.quantity} onChange={onChangeItemName}  name="quantity"/>
        <button onClick={updateItem}>Update Item</button>
        {/* <input onChange={onChangePlusMinus} type="number" value={plusMinus}/> */}
      </div>
    );
  };

export default EditItemModal