import { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useLocalStorage = (key: string, initialValue: any)=>{
    const [state, setState] = useState(() => {
      if(!initialValue) return;
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      } catch(error){
          return initialValue;
        }
    });

  useEffect(() => {
    if(state){
      try {
        localStorage.setItem(key, JSON.stringify(state));
      }catch(error){
        console.log(error);
      }
    }
  }, [state, key]);

  return [state, setState];
};