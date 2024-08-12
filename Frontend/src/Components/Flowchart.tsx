import React, { useState, useCallback } from 'react';
import ReactFlow, { Edge, Node, Controls, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

interface CustomNode {
  id: string;
  label: string;
  time: string;
  link: string;
  tips: string;
}

interface FlowchartProps {
  title: string;
  nodes: CustomNode[];
}

const customModalStyles = {
  content: {
    top: '0',
    right: '0',
    bottom: '0',
    left: 'auto',
    width: '30%',
    height: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '0',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: 'black',
    overflowY: 'auto' as const,
  },
};

const Flowchart: React.FC<FlowchartProps> = ({ title, nodes }) => {
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodeElements: Node[] = [];
  const edgeElements: Edge[] = [];
  console.log({title})
  const nodeDetailsMap: { [key: string]: Omit<CustomNode, 'id' | 'label'> } = {};

  const baseNodeStyle = {
    backgroundColor: '#f9f295',
    border: '2px solid #000',
    color: '#333',
    padding: '10px',
    borderRadius: '5px',
    height: '50px',
  };

  const verticalSpacing = 200;

  nodes.forEach((node, index) => {
    const labelNodeId = `node-${index}`;
    nodeDetailsMap[labelNodeId] = {
      time: node.time,
      link: node.link,
      tips: node.tips,
    };

    nodeElements.push({
      id: labelNodeId,
      data: { label: <strong>{node.label}</strong> },
      position: { x: 675, y: (index + 1) * verticalSpacing },
      style: baseNodeStyle,
    });

    if (index < nodes.length - 1) {
      const nextLabelNodeId = `node-${index + 1}`;
      edgeElements.push({
        id: `edge-${labelNodeId}-${nextLabelNodeId}`,
        source: labelNodeId,
        target: nextLabelNodeId,
        type: 'smoothstep',
        style: { stroke: '#333' },
      });
    }
  });

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const selectedDetails = nodeDetailsMap[node.id] || null;
    const labelText = React.isValidElement(node.data.label)
      ? (node.data.label as React.ReactElement).props.children.toString()
      : node.data.label.toString();

    const selected = selectedDetails
      ? { id: node.id, ...selectedDetails, label: labelText }
      : null;

    setSelectedNode(selected);
    setIsModalOpen(true);
  }, [nodeDetailsMap]);

  return (
    <div className="w-screen h-screen relative bg-cover bg-center" style={{ backgroundImage: 'url("/pexels-hngstrm-1939485.jpg")' }}>
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded-md border border-gray-300 z-10 text-center">
        <h1 className="text-3xl font-fantasy">{title}</h1>
      </div>
      <ReactFlow
        nodes={nodeElements}
        edges={edgeElements}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <MiniMap />
        <Background gap={13} size={1} offset={2} />
      </ReactFlow>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
      >
        {selectedNode ? (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{selectedNode.label}</h2>
            <p className="mb-2"><strong>Time Taken:</strong> {selectedNode.time}</p>
            <p className="mb-2"><strong>Useful Link:</strong></p>
            <ul className="list-disc list-inside mb-2">
              <li>
                <a href={selectedNode.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedNode.link}</a>
              </li>
            </ul>
            <p><strong>Tips:</strong> {selectedNode.tips}</p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default Flowchart;
