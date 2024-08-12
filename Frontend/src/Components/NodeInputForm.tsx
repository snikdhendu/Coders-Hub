import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Node {
  id: string;
  label: string;
  time: string;
  link: string;
  tips: string;
}

interface NodeInputFormProps {
  onSubmit: (title: string, nodes: Node[]) => void; // Ensure correct function signature
}

const NodeInputForm: React.FC<NodeInputFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [nodes, setNodes] = useState<Node[]>([{ id: '', label: '', time: '', link: '', tips: '' }]);

  const handleAddNode = () => {
    setNodes([...nodes, { id: '', label: '', time: '', link: '', tips: '' }]);
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newNodes = [...nodes];
    newNodes[index][event.target.name as keyof Node] = event.target.value;
    setNodes(newNodes);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(title, nodes); // Pass title and nodes separately
  };

  return (
    <div className="bg-mainbg min-h-screen text-2xl text-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4 p-5 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Roadmap Title
          </label>
          <input
            className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter roadmap title"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {nodes.map((node, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <div className="flex-1 bg-white rounded-lg p-5 font-mono">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`label-${index}`}>
                Topic
              </label>
              <input
                className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter node label"
                type="text"
                id={`label-${index}`}
                name="label"
                value={node.label}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="flex-1 bg-white rounded-lg p-5 font-mono">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`time-${index}`}>
                Time Taken
              </label>
              <input
                className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter time taken"
                type="text"
                id={`time-${index}`}
                name="time"
                value={node.time}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="flex-1 bg-white rounded-lg p-5 font-mono">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`link-${index}`}>
                Link
              </label>
              <input
                className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter link"
                type="text"
                id={`link-${index}`}
                name="link"
                value={node.link}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="flex-1 bg-white rounded-lg p-5 font-mono">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`tips-${index}`}>
                Tips
              </label>
              <input
                className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter any tips"
                type="text"
                id={`tips-${index}`}
                name="tips"
                value={node.tips}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddNode}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Next
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeInputForm;
