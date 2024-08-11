import React, { useState, useEffect, useRef } from 'react';
import Tag from './Tag';

const TechStackSelector: React.FC = () => {
  const [techStack, setTechStack] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const response = await fetch('/techStack.json');
        const data = await response.json();
        setTechStack(data.techStack);
      } catch (error) {
        console.error('Error fetching the tech stack:', error);
      }
    };

    fetchTechStack();
  }, []);

  const handleSelect = () => {
    const value = selectRef.current?.value;
    if (value && !selectedTechStack.includes(value)) {
      setSelectedTechStack([...selectedTechStack, value]);
    }
    if (selectRef.current) {
      selectRef.current.value = "Pick one";
    }
  };

  const handleRemoveTag = (tech: string) => {
    setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
  };

  return (
  
      <label className="form-control w-full max-w-xs text-textthird font-royal4 text-xl font-bold ">
        <div className="label">
          <span className="label-text text-textthird font-royal4 text-xl font-bold">Technology used</span>
        </div>
        <div className="flex flex-wrap items-center bg-mainbg">
          <div className="flex flex-wrap gap-2 items-center">
            {selectedTechStack.map((tech, index) => (
              <Tag key={index} text={tech} onRemove={() => handleRemoveTag(tech)} />
            ))}
            <select
              ref={selectRef}
              onChange={handleSelect}
              className="select bg-transparent text-textmain font-royal4 text-xl font-bold outline-none w-96 border-1 border-textmain "
            >
              <option disabled selected className="text-textthird font-royal4 text-base font-normal">Pick one</option>
              {techStack.map((tech, index) => (
                <option key={index} className="text-textthird font-royal4 text-xl font-normal">
                  {tech}
                </option>
              ))}
            </select>
          </div>
        </div>
      </label>

  );
};

export default TechStackSelector;
