import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  selectedData: 'Form',
  list:[],
  isFocus:false
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.isLoading = action.payload;
    },
    setSelectedTarget(state, action: PayloadAction<any>) {
      state.selectedData = action.payload;
    },
    setList(state, action:PayloadAction<any>){
      state.list = action.payload;
    },
    setIsFocus(state, action:PayloadAction<any>){
      state.isFocus = action.payload;
    }
  
  },
});

export const {setLoading,setSelectedTarget,setList ,setIsFocus} = homeSlice.actions;
export default homeSlice.reducer;
