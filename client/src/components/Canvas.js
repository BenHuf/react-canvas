import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Line, Text } from 'react-konva';

// function to convert current canvas to image 
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Canvas = (props) => {
  const [tool, setTool] = React.useState('pen');
  const [color, setColor] = React.useState("#000000")
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const stageRef = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // Instead of logging here we can 
    // save to database or allow downloads
    // using the generated uri
    // downloadURI(uri, 'stage.png');
  };

  return (
    <div>
      <p>Click and drag to draw!</p>

      {/* Tool Selector */}
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      {/* Color Selector */}
      <select
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

      {/* Save button */}
      <button onClick={handleExport}>Click here to log stage data URL</button>
    </div>
  )
}

export default Canvas