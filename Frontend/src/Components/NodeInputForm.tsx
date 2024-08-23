import React, { useState, useEffect, FormEvent } from 'react';

interface Node {
  id: string;
  label: string;
  time: string;
  links: string[];
  tips: string;
}

interface NodeInputFormProps {
  onSubmit: (title: string, nodes: Node[]) => void;
  initialTitle?: string;
  initialNodes?: Node[];
}

const NodeInputForm: React.FC<NodeInputFormProps> = ({ onSubmit, initialTitle = '', initialNodes = [] }) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [nodes, setNodes] = useState<Node[]>(initialNodes.length > 0 ? initialNodes : [{ id: '', label: '', time: '', links: [''], tips: '' }]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  
  useEffect(() => {
    if (initialTitle !== title) {
      setTitle(initialTitle);
    }
    if (initialNodes.length !== nodes.length) {
      setNodes(initialNodes.length > 0 ? initialNodes : [{ id: '', label: '', time: '', links: [''], tips: '' }]);
      setCurrentStep(0);
    }
  }, [initialTitle, initialNodes]);

  
  const handleAddNode = () => {
    setNodes([...nodes, { id: '', label: '', time: '', links: [''], tips: '' }]);
    setCurrentStep(nodes.length); // Move to the next step
  };

  
  const handleInputChange = (index: number, field: keyof Node, value: string, linkIndex?: number) => {
    const newNodes = [...nodes];
    if (field === 'links' && linkIndex !== undefined) {
      newNodes[index].links[linkIndex] = value;
    } else {
      newNodes[index][field] = value as any;
    }
    setNodes(newNodes);
  };

  
  const handleAddLink = (nodeIndex: number) => {
    const newNodes = [...nodes];
    newNodes[nodeIndex].links.push('');
    setNodes(newNodes);
  };

  
  const handleRemoveLink = (nodeIndex: number, linkIndex: number) => {
    const newNodes = [...nodes];
    newNodes[nodeIndex].links.splice(linkIndex, 1);
    setNodes(newNodes);
  };


  const handleDeleteNode = () => {
    if (nodes.length > 1) {
      const newNodes = nodes.filter((_, index) => index !== currentStep);
      setNodes(newNodes);
      setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
    }
  };


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(title, nodes);
  };

  
  const handleNextStep = () => {
    if (currentStep < nodes.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleAddNode();
    }
  };

  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
          index === currentStep && (
            <div key={index} className="space-y-4 mb-4">
              <div className="bg-white rounded-lg p-5 font-mono">
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
                  onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                />
              </div>
              <div className="bg-white rounded-lg p-5 font-mono">
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
                  onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                />
              </div>
              <div className="bg-white rounded-lg p-5 font-mono">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Links
                </label>
                {node.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="flex space-x-2 mb-2">
                    <input
                      className="text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                      placeholder={`Enter link ${linkIndex + 1}`}
                      type="text"
                      value={link}
                      onChange={(e) => handleInputChange(index, 'links', e.target.value, linkIndex)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index, linkIndex)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLink(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Add Link
                </button>
              </div>
              <div className="bg-white rounded-lg p-5 font-mono">
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
                  onChange={(e) => handleInputChange(index, 'tips', e.target.value)}
                />
              </div>
            </div>
          )
        ))}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Previous
            </button>
          )}
          {currentStep < nodes.length - 1 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Next
            </button>
          )}
          {currentStep === nodes.length - 1 && (
            <button
              type="button"
              onClick={handleAddNode}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Add Node
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteNode}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Delete Node
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeInputForm;
