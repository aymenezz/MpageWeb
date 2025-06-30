import React, { useState } from 'react';
import './DragDropGenerator.css';

const DraggableDiv = ({ onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'draggable-div');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`draggable ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDragEnd}
      style={{
        backgroundColor: '#4CAF50',
        width: '150px',
        height: '150px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold'
      }}
    >
      Drag Me
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'draggable-div') {
      onDrop();
    }
  };

  return (
    <div
      className={`drop-zone ${isOver ? 'hovered' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: '300px',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        cursor: 'pointer'
      }}
    >
      Drop Here
    </div>
  );
};

const DragDropGenerator = () => {
  const [jsxCode, setJsxCode] = useState('');

  const generateJsx = () => {
    const jsx = `
    <div
      style={{
        backgroundColor: '#4CAF50',
        width: '150px',
        height: '150px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold'
      }}
    >
      Drag Me
    </div>
    `;
    setJsxCode(jsx);
  };

  return (
    <div className="drag-drop-container">
      <h2>Drag & Drop JSX Generator</h2>
      <div className="components">
        <DraggableDiv onDrop={generateJsx} />
        <DropZone onDrop={generateJsx} />
      </div>
      {jsxCode && (
        <div className="generated-code">
          <h3>Generated JSX Code:</h3>
          <pre className="code-block">
            <code>{jsxCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default DragDropGenerator;
