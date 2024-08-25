import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Flowchart from '../Components/Flowchart';

interface CustomNode {
  id: string;
  label: string;
  time: string;
  links: string[];  
  tips: string;
}

interface LocationState {
  id: string;
  title: string;
  nodes: CustomNode[];
  viewOnly: boolean; // Include viewOnly in the LocationState interface
}

const FlowchartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/'); 
    return null;
  }

  const { id, title, nodes, viewOnly } = state;

  return (
    <div>
      <Flowchart id={id} title={title} nodes={nodes} viewOnly={viewOnly} /> 
    </div>
  );
};

export default FlowchartPage;
