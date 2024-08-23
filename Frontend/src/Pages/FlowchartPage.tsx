
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
  title: string;
  nodes: CustomNode[];
}

const FlowchartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/dashboard/:userName/roadmap/newflowchart'); 
    return null;
  }

  const { title, nodes } = state;

  return (
    <div>
      <Flowchart title={title} nodes={nodes} />
    </div>
  );
};

export default FlowchartPage;

