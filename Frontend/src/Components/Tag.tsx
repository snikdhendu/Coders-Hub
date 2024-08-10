import React from 'react';

interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <div className="inline-flex items-center bg-blue-600 text-white px-2 py-1 rounded mr-2 mb-2">
      {text}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-sm bg-red-500 rounded-full px-2 py-1 hover:bg-red-700"
      >
        x
      </button>
    </div>
  );
};

export default Tag;
