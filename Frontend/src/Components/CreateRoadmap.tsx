import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const { userName } = useParams();
  const { title = '', nodes = [] } = location.state as { title?: string; nodes?: CustomNode[] } || {};

  const handleSubmit = (title: string, nodes: CustomNode[]) => {
    const formattedTitle = title.trim().replace(/\s+/g, '-').toLowerCase();
    navigate(`/dashboard/${userName}/roadmap/${formattedTitle}`, { 
      state: { 
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
