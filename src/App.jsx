import { useEffect, useRef, useState } from 'react'
// import templateImg from './assets/intuitpass.png'
import templateImg from './assets/bigid.jpg'

import './App.css'
import Navbar from './components/Navbar';
import Form from './components/Form';

function App() {
  const canvasRef = useRef(null);
  const [username, setUsername] = useState('');
  const [discordRole, setDiscordRole] = useState('');
  const [iqLevel, setIqLevel] = useState('');
  const [topActivity, setTopActivity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bullish, setBullish] = useState('');
  const [motto, setMotto] = useState('');
  const [photo, setPhoto] = useState(null);


  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear previous content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the template background
    const bg = new Image();
    bg.src = templateImg;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      // Draw uploaded photo if available
      if (photo) {

const maxWidth = 220;
const maxHeight = 220;

const imgWidth = photo.width;
const imgHeight = photo.height;

const widthRatio = maxWidth / imgWidth;
const heightRatio = maxHeight / imgHeight;
const scale = Math.min(widthRatio, heightRatio); // Preserve aspect ratio

const drawWidth = imgWidth * scale;
const drawHeight = imgHeight * scale;


ctx.drawImage(photo, 242, 179, drawWidth, drawHeight);
      }

      // Draw the name
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'top'


      ctx.fillText(username, 785, 420);
      ctx.fillText(discordRole, 785, 580);
      ctx.fillText(occupation, 785, 720);
      ctx.fillText(iqLevel, 1308, 420);
      ctx.fillText(topActivity, 1305, 580);
      ctx.fillText(bullish, 1305, 720);
      ctx.fillText(motto, 260, 300);
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [username, discordRole, iqLevel, topActivity, occupation, bullish, motto, photo]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => setPhoto(img);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL();
    link.click(); n
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <h2 className="text-2xl font-bold">Create Your Intuition ID!</h2>

        <Form
          username={username} setUsername={setUsername}
          discordRole={discordRole} setDiscordRole={setDiscordRole}
          iqLevel={iqLevel} setIqLevel={setIqLevel}
          topActivity={topActivity} setTopActivity={setTopActivity}
          occupation={occupation} setOccupation={setOccupation}
          bullish={bullish} setBullish={setBullish}
          motto={motto} setMotto={setMotto}
          setPhoto={setPhoto} />

        <div className="w-full flex justify-center">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="border w-[500px] h-auto border-gray-300 rounded-md shadow"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleDownload}
            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-blue-900 transition"
          >
            Download from the Overmind
          </button>
        </div>
      </div>
    </main>
  );
}

export default App
