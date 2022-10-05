import {useState} from 'react';

export function useLocalStorage(key:string, initialValue:any){
const [storageValue, setstorageValue] = useState(()=>{
try {
    const item= window.localStorage.getItem(key)
    return item? JSON.parse(item) : initialValue
} catch (error) {
    return initialValue
}
})

const setValue = (value:any) =>{
try {
    setstorageValue(value)
    window.localStorage.setItem(key,JSON.stringify(value))
} catch (error) {
    console.error(error)
}
}
}