import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import "../Canvas.css"

document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });

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
  const [width, setWidth] = React.useState(7)
  const [lines, setLines] = React.useState([]);
  const [flips, setFlips] = React.useState([]);
  const [canvas, setCanvas] = React.useState([]);

  const isDrawing = React.useRef(false);

  //------ Mouse Events ------//

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [window.innerWidth-pos.x, pos.y]}])
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastFlip = flips[flips.length -1];


    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastFlip.points = lastFlip.points.concat([window.innerWidth-point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    flips.splice(flips.length - 1, 1, lastFlip);
    // setLines(lines.push(flips))
    setLines(lines.concat());
    setFlips(flips.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    console.log("lines" + lines[0].points)
    console.log("points" + lines.points)
  };

  //------ End mouse events -------//

  //------ Touch events ------//
  const handleTouchStart = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [window.innerWidth-pos.x, pos.y]}])
  };

  const handleTouchMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastFlip = flips[flips.length -1];


    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastFlip.points = lastFlip.points.concat([window.innerWidth-point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    flips.splice(flips.length - 1, 1, lastFlip);
    // setLines(lines.push(flips))
    setLines(lines.concat());
    setFlips(flips.concat());
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    console.log("lines" + lines[0].points)
    console.log("points" + lines.points)
  };

  //------ End Touch events ------//

  const stageRef = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // Instead of logging here we can 
    // save to database or allow downloads
    // using the generated uri
    // downloadURI(uri, 'stage.png');
  };

  const clearCanvas = () => {
    setLines([]);
    setFlips([]);
  };

  return (
    <div>
      <p>Click and drag to draw!</p>
      <button onClick={clearCanvas}>Clear</button>

      {/* Tool Selector */}
      {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen" disabled>Tool</option>
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select> */}

      {/* Color Selector */}
      {/* <select
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      >
        <option value="#000000" disabled>Color</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="yellow">Yellow</option>
      </select> */}

      {/* Width Selector */}
      <select
        value={width}
        onChange={(e) => {
          setWidth(e.target.value);
        }}
        placeholder={"Width"}
      >
        <option value="7" disabled>Width</option>
        <option value="3">small</option>
        <option value="7">medium</option>
        <option value="14">large</option>
        <option value="20">largest</option>
      </select>

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                shadowColor={line.color}
                strokeWidth={line.width}
                tension={0.5}
                opacity={line.tool === 'pen' && 0.6 || line.tool === 'eraser' && 1}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
               {flips.map((flip, i) => (
              <Line
                key={i}
                points={flip.points}
                stroke={flip.color}
                shadowColor={flip.color}
                strokeWidth={flip.width}
                tension={0.5}
                opacity={flip.tool === 'pen' && 0.6 || flip.tool === 'eraser' && 1}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  flip.tool === 'eraser' ? 'destination-out' : 'source-over'
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