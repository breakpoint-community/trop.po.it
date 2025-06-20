import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

const RandomBox = () => {
  const [bg, setBg] = useState(randomColor());
  useEffect(() => {
    const i = setInterval(() => setBg(randomColor()), 700);
    return () => clearInterval(i);
  }, []);
  return (
    <motion.div
      className="w-full h-64 flex items-center justify-center text-3xl font-bold"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 3 }}
      style={{ backgroundColor: bg }}
    >
      trop.po.it
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
              <p>{Math.random() > 0.5 ? "🦆 ASCII PAPERA" : "✨ Motivazione ✨"}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default function TropPoIt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-yellow-300 to-green-500 animate-[spin_20s_linear_infinite]">
      <RandomBox />
      <TooManyButtons />
      <div className="text-center mt-8 p-8 font-bold text-4xl text-white animate-bounce">
        SITO TROPPO INUTILE, MA TROPPO BENE
      </div>
    </div>
  );
}