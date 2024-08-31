import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactFlow, {
  Edge,
  Node,
  Background,
  
} from "reactflow";
import { useMutation } from "@apollo/client";
import { createFlowchart } from "../graphql/mutation/flowchartMutation";
import { useDispatch } from "react-redux";
import {
  setFlowchartTitle,
  addFlowchartNode,
} from "../../features/flowchartSlice";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { useUser } from "@clerk/clerk-react";

interface CustomNode {
  id: string;
  label: string;
  time: string;
  links: string[];
  tips: string;
}

interface FlowchartProps {
  id: string;
  title: string;
  nodes: CustomNode[];
  viewOnly: boolean;
}

const Flowchart: React.FC<FlowchartProps> = ({
  id,
  title,
  nodes,
  viewOnly,
}) => {
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);
  console.log(selectedNode)
  console.log(isModalVisible)
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const nodeElements: Node[] = [];
  const edgeElements: Edge[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createFlowchartMutation] = useMutation(createFlowchart);
  const nodeDetailsMap: { [key: string]: Omit<CustomNode, "id" | "label"> } =
    {};
  const { user } = useUser();
  if (!user) {
    return null;
    console.log(id, cardPosition);
  }

  const baseNodeStyle = {
    backgroundColor: "#ff0072",
    border: "2px solid #000",
    color: "white",
    fontSize:"20px",
    padding: "10px",
    borderRadius: "5px",
    height: "70px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

  };

  const horizontalSpacing = 100; // Gap between side nodes and main node
  const verticalSpacing = 200;   // Gap between rows of main nodes
  
  nodes.forEach((node, index) => {
    const labelNodeId = `node-${index}`;  // Unique ID for the main node
  
    // Main Node with Label
    nodeElements.push({
      id: labelNodeId,
      data: { label: <strong>{node.label}</strong> },
      position: { x: 675, y: (index + 1) * verticalSpacing },
      style: baseNodeStyle,
    });
  
    // Left Side Node (Time Taken)
    nodeElements.push({
      id: `${labelNodeId}-left`,  // Unique ID for left side node
      className:" flex h-fit justify-center items-center w-fit bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 p-4",
      data: {
        label: (
          <div className="p-1 bg-transparent rounded-md shadow-md w-fit max-w-48 max-h-32 overflow-y-auto text-center text-textmain dark:text-white flex  flex-col gap-3 text-pretty text-lg font-royal4">
            <p className="text-left ">
              <strong>Time Taken:</strong><span className="text-blue-500"> {node.time}</span> 
            </p>
            <p className=" text-left">
            <strong>Tips:</strong> <span className="text-blue-500">{node.tips}</span> 
            </p>
          </div>
        ),
      },
      position: { x: 575 - horizontalSpacing - 100, y: (index + 1) * verticalSpacing },  // Position to the left
    });
  
    // Right Side Node (Resources)
    nodeElements.push({
      id: `${labelNodeId}-right`,  // Unique ID for right side node
      className:" flex h-fit justify-center items-center w-fit bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 dark:text-white flex  flex-col gap-3 text-pretty text-lg font-royal4",
      data: {
        label: (
          <div className="p-2 bg-transparent rounded-md shadow-md w-fit text-center text-textmain dark:text-white">
            <strong>Resources:</strong>
            <ul className="list-disc list-inside text-blue-500 text-left">
              {node.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-xs"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      position: { x: 775 + horizontalSpacing + 100, y: (index + 1) * verticalSpacing },  // Position to the right
    });
  
    // Edge between main node and left side node
    edgeElements.push({
      id: `edge-${labelNodeId}-left`,  // Unique ID for edge
      source: labelNodeId,
      target: `${labelNodeId}-left`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#1282a2', strokeWidth: 2 },
    });
  
    // Edge between main node and right side node
    edgeElements.push({
      id: `edge-${labelNodeId}-right`,  // Unique ID for edge
      source: labelNodeId,
      target: `${labelNodeId}-right`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#1282a2', strokeWidth: 2 },
    });
  
    // Edge to connect the main node to the next main node (to maintain the flow)
    if (index < nodes.length - 1) {
      const nextLabelNodeId = `node-${index + 1}`;  // Unique ID for the next main node
      edgeElements.push({
        id: `edge-${labelNodeId}-${nextLabelNodeId}`,  // Unique ID for edge
        source: labelNodeId,
        target: nextLabelNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#1282a2', strokeDasharray: '3 3', strokeWidth:3 },
      });
    }
  });
  
  

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const selectedDetails = nodeDetailsMap[node.id] || null;
      const labelText = React.isValidElement(node.data.label)
        ? (node.data.label as React.ReactElement).props.children.toString()
        : node.data.label.toString();

      const selected = selectedDetails
        ? { id: node.id, ...selectedDetails, label: labelText }
        : null;

      setSelectedNode(selected);
      setCardPosition({
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 150,
      }); // Center modal
      setIsModalVisible(true);
      console.log(event);
    },
    [nodeDetailsMap]
  );

  const handleEditClick = () => {
    navigate(`/dashboard/${user.firstName}/createroadmap`, {
      state: { title, nodes },
    });
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
        navigate(`/dashboard/${user.firstName}`);
      }
    } catch (error) {
      console.error("Failed to save flowchart:", error);
    }
  };



  return (
    <div className="w-screen h-screen relative bg-cover bg-center">
      {/* style={{ backgroundImage: 'url("/pexels-hngstrm-1939485.jpg")' }} */}
      {!viewOnly && (
        <>
          <div
            className="absolute top-5 left-5 bg-blue-500 text-white p-2 rounded-md cursor-pointer z-20"
            onClick={handleEditClick}
          >
            Edit
          </div>
          <div
            className="absolute top-5 right-5 bg-green-500 text-white p-2 rounded-md cursor-pointer z-20"
            onClick={handleFinalize}
          >
            Finalize
          </div>
        </>
      )}
      {viewOnly && (
        <Link to={`/dashboard/${user.id}`}
          className="absolute top-5 right-5 bg-yellow-500 text-white p-2 rounded-md cursor-pointer z-20"
          // onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </Link>
      )}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded-md border border-gray-300 z-10 text-center">
        <h1 className="text-3xl font-fantasy">{title}</h1>
      </div>
      <ReactFlow nodes={nodeElements} edges={edgeElements} onNodeClick={onNodeClick}>
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        <Background gap={13} size={1} offset={2} className="flex justify-center items-center"/>
      </ReactFlow>
    </div>
  );
};

export default Flowchart;
