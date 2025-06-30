import React, { useEffect, useState } from "react";

function Contral_kayboard() {
    const [expanded, setExpanded] = useState(false);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await fetch('/json/elements.json');
                const data = await response.json();
                setElements(data.elements);
            } catch (error) {
                console.error('Error fetching elements:', error);
            }
        };
        fetchElements();
    }, []);

    const handleDragStart = (e, element) => {
        e.dataTransfer.setData('text/plain', element.jsx);
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('application/json', JSON.stringify(element));
    };

    return (
        <div className="contral_kayboard">
            <div 
                className="detiles" 
                style={{ 
                    maxWidth: expanded ? '260px' : '66px',
                    transition: 'max-width 0.3s ease'
                }}
            >
                <button 
                    className="expand-btn" 
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Collapse' : 'Expand'}
                </button>

                <div className="inner-content" style={{
                    display: expanded ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    {elements.map((element) => (
                        <li key={element.id}>
                            <button 
                                draggable
                                onDragStart={(e) => handleDragStart(e, element)}
                                style={element.style}
                                itemID={element.id}
                            >
                                {element.name}
                            </button>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contral_kayboard;