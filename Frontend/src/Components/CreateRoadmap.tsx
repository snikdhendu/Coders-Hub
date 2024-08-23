// // import React from 'react';
// import React, { useCallback, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Node,
//   Edge,
//   Connection
// } from 'reactflow';
// import Modal from 'react-modal';
// import 'reactflow/dist/style.css';

// // Modal.setAppElement('#root');

// const initialNodes: Node[] = [
//   { id: '1', type: 'default', position: { x: 100, y: 100 }, data: { label: '1', color: '#f0f0f0', timeTaken: '' } },
//   { id: '2', type: 'default', position: { x: 100, y: 300 }, data: { label: '2', color: '#f0f0f0', timeTaken: '' } },
// ];

// const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

// const Userroadmap= () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
//   const [nodeId, setNodeId] = useState<number>(3);
//   const [selectedNode, setSelectedNode] = useState<Node | null>(null);
//   const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
//   const [label, setLabel] = useState<string>('');
//   const [color, setColor] = useState<string>('#f0f0f0');
//   const [timeTaken, setTimeTaken] = useState<string>('');
//   const [isLocked, setIsLocked] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const onConnect = useCallback(
//     (params: Connection) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const addCustomNode = () => {
//     const newNode: Node = {
//       id: nodeId.toString(),
//       type: 'default',
//       position: { x: Math.random() * 250, y: Math.random() * 250 },
//       data: { label: `${nodeId}`, color: '#f0f0f0', timeTaken: '' },
//     };
//     setNodes((nds) => nds.concat(newNode));
//     setNodeId((id) => id + 1);
//   };

//   const onLocked = () => {
//     setIsLocked(!isLocked);
//   };

//   const onNodeClick = (event: React.MouseEvent, node: Node) => {
//     setSelectedNode(node);
//     setSelectedEdge(null);
//     setLabel(node.data.label);
//     setColor(node.data.color);
//     setTimeTaken(node.data.timeTaken);
//     if (isLocked) {
//       setIsModalOpen(true);
//     }
//   };

//   const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
//     setSelectedEdge(edge);
//     setSelectedNode(null);
//   };

//   const updateNodeLabel = () => {
//     if (selectedNode) {
//       setNodes((nds) =>
//         nds.map((node) =>
//           node.id === selectedNode.id ? { ...node, data: { ...node.data, label } } : node
//         )
//       );
//       setSelectedNode(null);
//     }
//   };

//   const updateNodeColor = () => {
//     if (selectedNode) {
//       setNodes((nds) =>
//         nds.map((node) =>
//           node.id === selectedNode.id ? { ...node, data: { ...node.data, color } } : node
//         )
//       );
//       setSelectedNode(null);
//     }
//   };

//   const updateNodeTimeTaken = () => {
//     if (selectedNode) {
//       setNodes((nds) =>
//         nds.map((node) =>
//           node.id === selectedNode.id ? { ...node, data: { ...node.data, timeTaken } } : node
//         )
//       );
//       setSelectedNode(null);
//     }
//   };

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === 'Enter') {
//       updateNodeLabel();
//       updateNodeColor();
//       updateNodeTimeTaken();
//     } else if (event.key === 'Delete') {
//       deleteSelected();
//     }
//   };

//   const deleteSelected = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     } else if (selectedEdge) {
//       setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
//       setSelectedEdge(null);
//     }
//   };

//   useEffect(() => {
//     const handleKeydownEvent = (event: globalThis.KeyboardEvent) => {
//       handleKeyDown(event);
//     };
  
//     document.addEventListener('keydown', handleKeydownEvent);
    
//     return () => {
//       document.removeEventListener('keydown', handleKeydownEvent);
//     };
//   }, [selectedNode, selectedEdge, label, color, timeTaken]);
  
  

//   const onNodesDelete = useCallback(
//     (deletedNodes: Node[]) => {
//       setNodes((nds) => nds.filter((node) => !deletedNodes.some((dn) => dn.id === node.id)));
//       setEdges((eds) => eds.filter((edge) => !deletedNodes.some((dn) => dn.id === edge.source || dn.id === edge.target)));
//     },
//     [setNodes, setEdges]
//   );

//   const onEdgesDelete = useCallback(
//     (deletedEdges: Edge[]) => {
//       setEdges((eds) => eds.filter((edge) => !deletedEdges.some((de) => de.id === edge.id)));
//     },
//     [setEdges]
//   );

//   const getNodeStyles = (node: Node) => {
//     return {
//       background: node.data.color,
//       border: '2px solid black',
//       padding: 10,
//       borderRadius: 5,
//     };
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundImage: 'url("/pexels-danielabsi-952670.jpg")', backgroundSize: 'cover' }}>
//       {!isLocked && (
//         <button onClick={addCustomNode} style={{  position: 'absolute',
//           zIndex: 10,
//           top: 10,
//           left: 10,
//           color: 'white',             // Text color
//           padding: '10px 30px',       // More padding (15px top/bottom, 30px left/right)
//           fontSize: '16px',           // Larger font size
//           border: '2px solid black',  // Black border
//           borderRadius: '10px',       // Rounded corners with 10px radius
//           backgroundColor: 'black',   // Optional: White background
//           cursor: 'pointer' }}>
//           Add Node
//         </button>
//       )}
//       {selectedNode && !isLocked && (
//         <div style={{ position: 'absolute', zIndex: 10, top: 50, left: 10, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
//           <label style={{ color: 'black' }}>
//             Topic:
//             <input
//               type="text"
//               value={label}
//               style={{marginLeft:'5px',backgroundColor:'white',border: '1px solid black'}}
//               onChange={(e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//           </label>
//           <label style={{ color: 'black', marginLeft: '10px' }}>
//             Node Color:
//             <input
//               type="color"
//               value={color}
//               onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
//               onKeyDown={handleKeyDown}
//               style={{ marginLeft: '10px',backgroundColor:'white',border: '1px solid black' }}
//             />
//           </label>
//           <label style={{ color: 'black', marginLeft: '10px' }}>
//             Time Taken:
//             <input
//               type="text"
//               value={timeTaken}
//               onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeTaken(e.target.value)}
//               onKeyDown={handleKeyDown}
//               style={{ marginLeft: '10px',backgroundColor:'white',border: '1px solid black' }}
//             />
//           </label>
//           <button onClick={deleteSelected} style={{ marginLeft: '10px',color:'black', border:'1px solid black', padding:'5px' }}>
//             Delete Node
//           </button>
//         </div>
//       )}
//       <button onClick={onLocked} style={{ position: 'absolute', top: 10, zIndex: 10, right: 10, color: 'white',             // Text color
//           padding: '10px 30px',       // More padding (15px top/bottom, 30px left/right)
//           fontSize: '16px',           // Larger font size
//           border: '2px solid black',  // Black border
//           borderRadius: '10px',       // Rounded corners with 10px radius
//           backgroundColor: 'black',   // Optional: White background
//           cursor: 'pointer' }}>
//         {isLocked ? 'Edit' : 'Finalize'}
//       </button>
//       <ReactFlow
//         nodes={nodes.map((node) => ({ ...node, style: getNodeStyles(node) }))}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeClick={onNodeClick}
//         onEdgeClick={onEdgeClick}
//         onNodesDelete={onNodesDelete}
//         onEdgesDelete={onEdgesDelete}
//         minZoom={0.2}
//         maxZoom={3}
//         fitView
//       >
//         <Controls />
//         <MiniMap />
//         <Background gap={13} size={1} offset={2} />
//       </ReactFlow>
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         style={{
//           content: {
//             top: '0',
//             right: '0',
//             bottom: '0',
//             left: 'auto',
//             width: '30%',
//             height: '100%',
//             backgroundColor: '#fff',
//             padding: '20px',
//             borderRadius: '0',
//             border: '1px solid #ccc',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//             color: 'black',
//             overflowY: 'auto'
//           }
//         }}
//       >
//         {selectedNode && (
//           <>
//             <h2>{selectedNode.data.label}</h2>
//             <p><strong>Time Taken:</strong> {selectedNode.data.timeTaken}</p>
//             <p><strong>Useful Links:</strong></p>
//             <ul>
//               <li><a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">https://example.com/link1</a></li>
//               <li><a href="https://example.com/link2" target="_blank" rel="noopener noreferrer">https://example.com/link2</a></li>
//               <li><a href="https://example.com/link3" target="_blank" rel="noopener noreferrer">https://example.com/link3</a></li>
//             </ul>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// }
// export default Userroadmap;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NodeInputForm from './NodeInputForm';

interface CustomNode {
  id: string;
  label: string;
  time: string;
  links: string[];
  tips: string;
}

const Userroadmap: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure that location.state is an object with title and nodes properties
  const { title = '', nodes = [] } = location.state as { title?: string; nodes?: CustomNode[] } || {};

  const handleSubmit = (title: string, nodes: CustomNode[]) => {
    navigate(`/dashboard/:userName/roadmap/newflowchart`, { state: { title, nodes } });
  };

  return (
    <div>
      <NodeInputForm onSubmit={handleSubmit} initialTitle={title} initialNodes={nodes} />
    </div>
  );
};

export default Userroadmap;


