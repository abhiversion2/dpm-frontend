import { useState } from 'react'
import './App.css'

function App() {
  const [moodValue, setMoodValue] = useState(50);

  // Determine mood properties based on the slider value
  const getMoodData = (val) => {
    if (val < 25) return { emoji: "😴", label: "Chilled", color: "#3498db" };
    if (val < 50) return { emoji: "😊", label: "Happy", color: "#2ecc71" };
    if (val < 75) return { emoji: "⚡", label: "Energetic", color: "#f1c40f" };
    return { emoji: "🔥", label: "Unstoppable", color: "#e67e22" };
  };

  const currentMood = getMoodData(moodValue);

  return (
    <div className="mood-wrapper" style={{ backgroundColor: `${currentMood.color}22` }}>
      <div className="mood-card" style={{ borderColor: currentMood.color }}>
        <h1 className="mood-emoji">{currentMood.emoji}</h1>
        <h2>Current Vibe: <span style={{ color: currentMood.color }}>{currentMood.label}</span></h2>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={moodValue} 
          onChange={(e) => setMoodValue(e.target.value)} 
          className="mood-slider"
        />

        <p className="intensity">Intensity Level: {moodValue}%</p>
        
        <button 
          className="pulse-btn" 
          style={{ backgroundColor: currentMood.color }}
          onClick={() => alert(`Level ${moodValue} ${currentMood.label} status locked in!`)}
        >
          Lock In Mood BUtton
        </button>
      </div>
    </div>
  )
}

export default App