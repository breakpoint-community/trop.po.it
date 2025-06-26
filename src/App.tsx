import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as Tone from "tone";

// Pentatonica blues di Do
const bluesScale = ["C4", "Eb4", "F4", "F#4", "G4", "Bb4"];

let clickSynth: Tone.FMSynth | null = null;

const startBluesMusic = async () => {
  await Tone.start();

  clickSynth = new Tone.FMSynth().toDestination();

  const leadSynth = new Tone.Synth().toDestination();
  const chordSynth = new Tone.PolySynth().toDestination();
  chordSynth.volume.value = -6;

  // Gli accordi!!!
  const bluesChords = [
    ["C3", "Eb3", "G3", "Bb3"],
    ["C3", "Eb3", "F3", "Ab3"],
    ["D3", "F3", "Ab3", "C4"],
    ["D3", "F3", "G3", "B3"],
  ];

  const playRandomNote = () => {
    const randomNote =
      bluesScale[Math.floor(Math.random() * bluesScale.length)];
    leadSynth.triggerAttackRelease(randomNote, "16n");
    const nextDelay = Math.random() * 350 + 200;
    setTimeout(playRandomNote, nextDelay);
  };

  let chordIndex = 0;
  const playChordSequence = () => {
    const currentChord = bluesChords[chordIndex];
    chordSynth.triggerAttackRelease(currentChord, "2n");

    // Prossimo accordo
    chordIndex = (chordIndex + 1) % bluesChords.length;

    // Timeout per il prossimo accordo
    setTimeout(playChordSequence, 1000);
  };

  // Inizia melodia e accordi
  playRandomNote();
  playChordSequence();
};

const playClickSound = () => {
  if (clickSynth) {
    const randomNote =
      bluesScale[Math.floor(Math.random() * bluesScale.length)];
    clickSynth.triggerAttackRelease(randomNote, "8n");
  }
};

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const RandomBox = () => {
  const [bg, setBg] = useState(randomColor());

  useEffect(() => {
    const i = setInterval(() => setBg(randomColor()), 700);
    return () => clearInterval(i);
  }, []);

  const handleBoxClick = () => {
    playClickSound();
  };

  return (
    <motion.div
      className="w-full h-64 flex items-center justify-center text-3xl font-bold cursor-pointer"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 3 }}
      style={{ backgroundColor: bg }}
      onClick={handleBoxClick}
    >
      Cliccami trop.po.it
    </motion.div>
  );
};

const TooManyButtons = () => {
  const [modals, setModals] = useState<number[]>([]);

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {[...Array(20)].map((_, i) => (
        <Button key={i} onClick={() => setModals([...modals, i])}>
          NON CLICCARE #{i + 1}
        </Button>
      ))}
      {modals.map((id) => (
        <div
          key={id}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setModals(modals.filter((m) => m !== id))}
        >
          <Card className="w-96 bg-white animate-pulse">
            <CardContent className="p-4">
              <p className="text-xl font-mono">Modal inutile #{id}</p>
              <p>
                {Math.random() > 0.5 ? "🦆 ASCII PAPERA" : "✨ Motivazione ✨"}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default function TropPoIt() {
  const [musicStarted, setMusicStarted] = useState(false);

  const handleStartMusic = async () => {
    if (!musicStarted) {
      await startBluesMusic();
      setMusicStarted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-yellow-300 to-green-500 animate-[spin_20s_linear_infinite]">
      {!musicStarted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Button
            onClick={handleStartMusic}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xl px-8 py-4 animate-pulse"
          >
            🎵 METTI TROPPO BLUES! 🎵
          </Button>
        </div>
      )}

      <RandomBox />
      <TooManyButtons />

      <div className="text-center mt-8 p-8 font-bold text-4xl text-white animate-bounce">
        SITO TROPPO INUTILE, MA TROPPO BENE
      </div>
    </div>
  );
}
