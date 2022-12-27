
import { useEffect } from 'react';
import { useState } from 'react'

const useLocalStorageHook = (key,initialState) => {
    const [item,setItem] = useState(
        localStorage.getItem(key) ||  initialState
    )
    useEffect(() => {
        localStorage.setItem(key, item);
      }, [item, key]);
     
    return [item,setItem]
}

export default useLocalStorageHook