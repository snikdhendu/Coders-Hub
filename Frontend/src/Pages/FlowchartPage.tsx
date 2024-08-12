
import React from 'react';
import { useLocation } from 'react-router-dom';
import Flowchart from '../Components/Flowchart';

interface CustomNode {
    id: string;
    label: string;
    time: string;
    link: string;
    tips: string;
}

interface LocationState {
    title: string;
    nodes: CustomNode[];
}

const FlowchartPage: React.FC = () => {
  const location = useLocation();
  const { title, nodes } = location.state as LocationState;

  return (
    <div>
      <Flowchart title={title} nodes={nodes} />
    </div>
  );
};

export default FlowchartPage;

