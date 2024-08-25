import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FlowchartNode {
    label: string;
    time: string;
    links: string[];
    tips: string;
  }
  
  export interface Flowchart {
    _id: string;
    title: string;
    nodes: FlowchartNode[];
  }

  const initialState: Flowchart = {
    _id: '',
    title: '',
    nodes: [],
  };

  const flowchartSlice = createSlice({
    name: 'flowchart',
    initialState,
    reducers: {
      setFlowchartTitle: (state, action: PayloadAction<string>) => {
        state.title = action.payload;
      },
      addFlowchartNode: (state, action: PayloadAction<FlowchartNode>) => {
        state.nodes.push(action.payload);
      },
     
    },
  })

  export const {setFlowchartTitle,addFlowchartNode} = flowchartSlice.actions;
  export default flowchartSlice.reducer;