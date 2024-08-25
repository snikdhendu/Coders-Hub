import React, { useState, useEffect, FormEvent } from 'react';
import { FaTrash, FaPlusCircle ,FaStepBackward,FaStepForward,FaPaperPlane } from 'react-icons/fa';
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
    <div className="bg-white dark:border-b-slate-700 dark:bg-black min-h-screen text-2xl text-slate-200 p-5 overflow-y-hidden h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-2/3 h-4/5 p-10   bg-white dark:border-b-slate-700 dark:bg-background rounded-lg shadow-xl mx-auto my-5  min-w-[500px] text-black z-30 border-2 overflow-y-auto">
        <div className="mb-4">
          <label className="block text-textmain  mb-1 dark:text-white text-xl font-royal4 font-bold" htmlFor="title">
            Roadmap Title
          </label>
          <input
            className="rounded-md custom-input w-full px-4 py-2 border bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain"
            placeholder="Enter roadmap title"
            type="text"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {nodes.map((node, index) => (
          index === currentStep && (
            <div key={index} className="space-y-4 mb-4">
              <div className=' flex w-full  px-5 justify-left gap-12'>
                <div className="bg-transparent rounded-lg p-2 font-mono">
                  <label className="block text-textmain  mb-1 dark:text-white text-lg font-royal4 font-bold" htmlFor={`label-${index}`}>
                    Topic
                  </label>
                  <input
                    className="rounded-md custom-input w-full px-4 py-2 border bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain"
                    placeholder="Enter node label"
                    type="text"
                    required
                    id={`label-${index}`}
                    name="label"
                    value={node.label}
                    onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                  />
                </div>
                <div className="bg-transparent rounded-lg p-2 font-mono">
                  <label className="block text-textmain  mb-1 dark:text-white text-lg font-royal4 font-bold" htmlFor={`time-${index}`}>
                    Time Taken
                  </label>
                  <input
                    className="rounded-md custom-input w-full px-4 py-2 border bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain"
                    placeholder="Enter time taken"
                    type="text"
                    id={`time-${index}`}
                    name="time"
                    value={node.time}
                    onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-transparent rounded-lg px-7 font-mono">
                <label className="block text-textmain mb-1 dark:text-white text-lg font-royal4 font-bold">
                  Links
                </label>
                {node.links.length === 0 ? (
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={() => handleAddLink(index)}
                      className="bg-blue-500 text-white py-3 px-3 shadow-md hover:bg-blue-600 transition duration-300 ease-in-out rounded-md"
                    >
                      <span className="hover-text">Add Link</span>
                      <FaPlusCircle />
                    </button>
                  </div>
                ) : (
                  node.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="flex space-x-2 mb-2">
                      <input
                        className="rounded-md custom-input w-2/3 px-4 py-2 border bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain"
                        placeholder={`Enter link ${linkIndex + 1}`}
                        type="url"
                        value={link}
                        onChange={(e) => handleInputChange(index, 'links', e.target.value, linkIndex)}
                      />
                      <div className="button-container">
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index, linkIndex)}
                          className="bg-red-500 text-white py-1 rounded-sm shadow-md hover:bg-red-600 transition duration-300 ease-in-out h-full text-lg px-3"
                        >
                          <span className="hover-text">Remove link</span>
                          <FaTrash />
                        </button>
                      </div>
                      {linkIndex === node.links.length - 1 && (
                        <div className="button-container">
                          <button
                            type="button"
                            onClick={() => handleAddLink(index)}
                            className="bg-blue-500 text-white py-1 px-3 h-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out rounded-md"
                          >
                            <span className="hover-text">Add Link</span>
                            <FaPlusCircle />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="bg-transparent rounded-lg px-7 font-mono">
                <label className="block text-textmain  mb-1 dark:text-white text-lg font-royal4 font-bold" htmlFor={`tips-${index}`}>
                  Tips
                </label>
                <textarea
                  className="rounded-md custom-input w-2/3 px-4 py-2 border bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain"
                  placeholder="Enter any tips"
                  id={`tips-${index}`}
                  name="tips"
                  value={node.tips}
                  onChange={(e) => handleInputChange(index, 'tips', e.target.value)}
                />
              </div>
            </div>
          )
        ))}
        <div className="flex justify-between px-7">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out flex gap-1 justify-center items-center text-base font-royal4"
            >
              <FaStepBackward/>
              Previous
             
            </button>
          )}
          {currentStep < nodes.length - 1 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex gap-1 justify-center items-center text-base font-royal4"
            >
              Next
             <FaStepForward/>
            </button>
          )}
          {currentStep === nodes.length - 1 && (
            <button
              type="button"
              onClick={handleAddNode}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex gap-1 justify-center items-center text-base font-royal4"
            >
              Add Node
              <FaPlusCircle />
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteNode}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out flex gap-1 justify-center items-center text-base font-royal4"
          >
            Delete Node
            <FaTrash/>
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out flex gap-2 justify-center items-center text-base font-royal4"
          >
            Submit
            <FaPaperPlane/>
            
          </button>
        </div>
      </form>
      <div className='shadow'></div>
    </div>
  );
};

export default NodeInputForm;
