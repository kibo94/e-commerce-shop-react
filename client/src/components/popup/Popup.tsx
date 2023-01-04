import React from 'react'
import { usePopUp } from '../../contexts/PopupContext';
import "./Popup.scss"
const Popup = () => {
  const { popUp , onClose } = usePopUp();
  const {type ,  top} = popUp;
  let popUpClass = `Popup ${type}`
  return (
    <div className={popUpClass} style={{top:top}}>
      <div className='overlay'>
        <span onClick={() => onClose()}>Close</span>
      </div>
      {popUp.message}
      </div>
  )
}

export default Popup