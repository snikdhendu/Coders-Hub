import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NodeInputForm from './NodeInputForm';

interface CustomNode {
  id: string;
  label: string;
  time: string;
  links: string[];
  tips: string;
}

const CreateRoadmap: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title = '', nodes = [] } = location.state as { title?: string; nodes?: CustomNode[] } || {};

  const handleSubmit = (title: string, nodes: CustomNode[]) => {
    const id = uuidv4();
    navigate(`/roadmaps/${id}`, { 
      state: { 
        id,
        title, 
        nodes, 
        viewOnly: false
      } 
    });
  };

  return (
    <div>
      <NodeInputForm onSubmit={handleSubmit} initialTitle={title} initialNodes={nodes} />
    </div>
  );
};

export default CreateRoadmap;
