import { useRef, useEffect } from "react";
import "./Waveform.css";

function animateBars(analyser, canvas, canvasCtx, dataArray, bufferLength) {
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = '#000';
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  const HEIGHT = canvas.height;
  const barWidth = Math.ceil(canvas.width / bufferLength) * 8;

  let barHeight;
  let x = 0;

const heightScale = 1;
  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * HEIGHT *  heightScale;
    const maximum = 10;
    const minimum = -10;

    canvasCtx.fillStyle = `rgba(0,191,255,0.2)`;
    canvasCtx.fillRect(x, HEIGHT-barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const WaveForm = ({ analyzerData }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null); // Store the animation frame ID
  const { dataArray, analyzer, bufferLength } = analyzerData;

  const draw = (dataArray, analyzer, bufferLength) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate); // Save the frame ID
      animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
    };

    animate();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
    return () => {
      cancelAnimationFrame(animationRef.current); // Cancel the animation on unmount
    };
  }, [dataArray, analyzer, bufferLength]);

  return (
    <canvas
      style={{
        position: "absolute",
        zIndex: "-10"
      }}
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default WaveForm;
