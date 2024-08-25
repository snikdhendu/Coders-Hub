import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, { Edge, Node, Controls, MiniMap, Background } from 'reactflow';
import { useMutation } from '@apollo/client';
import { createFlowchart } from '../graphql/mutation/flowchartMutation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setFlowchartTitle, addFlowchartNode } from '../../features/flowchartSlice';
import { setFlowcharts } from '../../features/userSlice';
import { getUsers } from "../graphql/query/userQuery";
import { useQuery } from "@apollo/client";
import 'reactflow/dist/style.css';
import 'tailwindcss/tailwind.css';
import { useUser } from "@clerk/clerk-react";

interface CustomNode {
  id: string;
  label: string;
  time: string;
  links: string[];
  tips: string;
}

interface FlowchartProps {
  title: string;
  nodes: CustomNode[];
  viewOnly: boolean;
}

const Flowchart: React.FC<FlowchartProps> = ({ title, nodes, viewOnly }) => {
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const nodeElements: Node[] = [];
  const edgeElements: Edge[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createFlowchartMutation] = useMutation(createFlowchart);
  const nodeDetailsMap: { [key: string]: Omit<CustomNode, 'id' | 'label'> } = {};
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const { userName } = useParams();
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
      links: node.links,
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
    setCardPosition({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 }); // Center modal
    setIsModalVisible(true);
  }, [nodeDetailsMap]);

  const handleEditClick = () => {
    navigate(`/dashboard/:userName/roadmap`, { state: { title, nodes } });
  };

  const handleSave = () => {
    setIsEditMode(false);
    setIsModalVisible(false);
  };

  const handleFinalize = async () => {
    try {
      dispatch(setFlowchartTitle(title));
      const response = await createFlowchartMutation({
        variables: {
          clerkUserId: user?.id,
          title,
          nodes: nodes.map((node) => ({
            label: node.label,
            time: node.time,
            links: node.links,
            tips: node.tips,
          })),
        },
      });

      if (response.data?.CREATE_FLOWCHART) {
        dispatch(addFlowchartNode(response.data.CREATE_FLOWCHART));
        navigate(`/dashboard/${userName}`);
      }
    } catch (error) {
      console.error("Failed to save flowchart:", error);
    }
  }

  return (
    <div className="w-screen h-screen relative bg-cover bg-center" style={{ backgroundImage: 'url("/pexels-hngstrm-1939485.jpg")' }}>
      {!viewOnly && (
        <>
          <div className="absolute top-5 left-5 bg-blue-500 text-white p-2 rounded-md cursor-pointer z-20" onClick={handleEditClick}>
            Edit
          </div>
          <div className="absolute top-5 right-5 bg-green-500 text-white p-2 rounded-md cursor-pointer z-20" onClick={handleFinalize}>
            Finalize
          </div>
        </>
      )}
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
      {isModalVisible && selectedNode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="relative bg-white border border-blue-200 shadow-lg rounded-md p-6 w-80 h-80 transition-all duration-200 ease-in-out hover:shadow-blue-500 hover:shadow-md"
            onClick={(e) => e.stopPropagation()} 
          >
            {isEditMode ? (
              <>
                <h2 className="text-2xl font-bold mb-2">Edit {selectedNode.label}</h2>
                <label className="block mb-2">Label:</label>
                <input
                  className="w-full mb-2 p-2 border rounded"
                  value={selectedNode.label}
                  onChange={(e) => setSelectedNode({ ...selectedNode, label: e.target.value })}
                />
                <label className="block mb-2">Time Taken:</label>
                <input
                  className="w-full mb-2 p-2 border rounded"
                  value={selectedNode.time}
                  onChange={(e) => setSelectedNode({ ...selectedNode, time: e.target.value })}
                />
                <label className="block mb-2">Links:</label>
                {selectedNode.links.map((link, index) => (
                  <input
                    key={index}
                    className="w-full mb-2 p-2 border rounded"
                    value={link}
                    onChange={(e) => {
                      const newLinks = [...selectedNode.links];
                      newLinks[index] = e.target.value;
                      setSelectedNode({ ...selectedNode, links: newLinks });
                    }}
                  />
                ))}
                <label className="block mb-2">Tips:</label>
                <input
                  className="w-full mb-2 p-2 border rounded"
                  value={selectedNode.tips}
                  onChange={(e) => setSelectedNode({ ...selectedNode, tips: e.target.value })}
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white p-2 rounded mt-4"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{selectedNode.label}</h2>
                <p className="mb-2"><strong>Time Taken:</strong> {selectedNode.time}</p>
                <p className="mb-2"><strong>Useful Links:</strong></p>
                <ul className="list-disc list-inside mb-2">
                  {selectedNode.links.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
                <p><strong>Tips:</strong> {selectedNode.tips}</p>
              </>
            )}
            <button onClick={() => setIsModalVisible(false)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flowchart;
