import React, { useState } from "react";

function Desktop() {
    const [isOver, setIsOver] = useState(false);
    const [droppedElements, setDroppedElements] = useState([]);
    const [draggingElement, setDraggingElement] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy'; 
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
        
        // Create a new element object
        const newElement = {
            jsx: data,
            id: Date.now(), // Unique ID
            position: {
                x: e.clientX,
                y: e.clientY
            }
        };
        const position={
            x: e.clientX,
            y: e.clientY
        }

        // Add to dropped elements
        setDroppedElements(prev => [...prev, newElement]);
    };

    const handleElementDragStart = (e, element) => {
        e.dataTransfer.effectAllowed = 'move';
        setDraggingElement(element.id);
    };

    const handleElementDrag = (e) => {
        if (draggingElement) {
            setDroppedElements(prev => 
                prev.map(el => 
                    el.id === draggingElement 
                        ? { ...el, position: { x: e.clientX, y: e.clientY } } 
                        : el
                )
            );
        }
    };

    const handleElementDragEnd = () => {
        setDraggingElement(null);
    };

    return (
        <div 
            className={`desktop_div ${isOver ? 'hovered' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            
        >
            
            
            {/* Render dropped elements */}
            {droppedElements.map((element) => (
                <div
                    draggable
                    onDragStart={(e) => handleElementDragStart(e, element)}
                    onDrag={handleElementDrag}
                    onDragEnd={handleElementDragEnd}
                    key={element.id}
                    style={{
                        position: 'absolute',
                        left: element.position.x,
                        top: element.position.y,
                        transform: `translate(-50%, -50%)`,
                        zIndex: 10,
                        cursor: 'move'
                    }}
                >
                    <div 
                        dangerouslySetInnerHTML={{ 
                            __html: element.jsx.replace("style='", `style=' transform: translate(${position.x}px, ${position.y}px),position: absolute; left: ${element.position.x}px; top: ${element.position.y}px; `) 
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
export default Desktop;