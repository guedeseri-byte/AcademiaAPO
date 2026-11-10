import React, { useState, useEffect, useRef } from "react";
import {
  Dumbbell,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle2,
  RotateCcw,
  Play,
  Pause,
  AlertTriangle,
  Download,
  Upload,
  ExternalLink,
  Shield,
  FileText,
  ChevronRight,
  Sparkles,
  Trophy,
  Activity,
  Check,
  Zap,
  Info,
  Trash2
} from "lucide-react";

// --- DADOS DA FICHA DE TREINO E LINKS DE DEMONSTRAÇÃO VISUAL ---
const WORKOUT_DATA = {
  "A": {
    id: "A",
    name: "Treino A — Base de Força",
    day: "Segunda-feira",
    objective: "Desenvolver força geral, pernas, peito, costas e estabilidade do tronco.",
    targetTime: "30–40 min",
    exercises: [
      {
        id: "a1",
        name: "1. Agachamento Goblet com halter",
        sets: 3,
        reps: "5–8",
        minReps: 5,
        maxReps: 8,
        rest: 120,
        muscle: "Quadríceps, Glúteos & Core",
        isLeg: true,
        notes: "Fortalece quadríceps, glúteos e core. Ajuda na força das pernas e estabilidade para movimentação e golpes.",
        defaultWeight: 14,
        visualUrl: "https://musclewiki.com/exercises/male/quadriceps/beginner/dumbbell-goblet-squat"
      },
      {
        id: "a2",
        name: "2. Supino reto com halteres",
        sets: 3,
        reps: "6–8",
        minReps: 6,
        maxReps: 8,
        rest: 120,
        muscle: "Peitoral, Tríceps & Ombros",
        isLeg: false,
        notes: "Desenvolve peitoral, tríceps e ombros. Melhora a força de empurrar e trabalha cada braço individualmente.",
        defaultWeight: 16,
        visualUrl: "https://musclewiki.com/exercises/male/chest/beginner/dumbbell-bench-press"
      },
      {
        id: "a3",
        name: "3. Remada com halteres apoiado no banco",
        sets: 3,
        reps: "8",
        minReps: 8,
        maxReps: 8,
        rest: 90,
        muscle: "Costas & Bíceps",
        isLeg: false,
        notes: "Fortalece costas e bíceps. O apoio reduz a exigência da lombar e permite concentrar o esforço nas costas.",
        defaultWeight: 14,
        visualUrl: "https://musclewiki.com/exercises/male/lats/beginner/dumbbell-bench-row"
      },
      {
        id: "a4",
        name: "4. Levantamento terra romeno com halteres",
        sets: 2,
        reps: "6–8",
        minReps: 6,
        maxReps: 8,
        rest: 90,
        muscle: "Posteriores, Glúteos & Lombar",
        isLeg: true,
        notes: "Trabalha posteriores da coxa, glúteos e região lombar. Desenvolve força na cadeia posterior, importante para potência.",
        defaultWeight: 16,
        visualUrl: "https://musclewiki.com/exercises/male/hamstrings/beginner/dumbbell-romanian-deadlift"
      },
      {
        id: "a5",
        name: "5. Pallof press na polia",
        sets: 2,
        reps: "10 por lado",
        minReps: 10,
        maxReps: 10,
        rest: 60,
        muscle: "Core Anti-Rotação",
        isLeg: false,
        notes: "Trabalha o core para resistir à rotação. Ajuda a estabilizar o tronco durante golpes, defesas e movimentações.",
        defaultWeight: 10,
        visualUrl: "https://musclewiki.com/exercises/male/abdominals/intermediate/cable-pallof-press"
      }
    ]
  },
  "B": {
    id: "B",
    name: "Treino B — Força Unilateral e Estabilidade",
    day: "Quarta-feira",
    objective: "Fortalecer cada perna individualmente, desenvolver ombros e costas e melhorar o equilíbrio muscular.",
    targetTime: "30–40 min",
    exercises: [
      {
        id: "b1",
        name: "1. Afundo reverso com halteres",
        sets: 3,
        reps: "6 por perna",
        minReps: 6,
        maxReps: 6,
        rest: 90,
        muscle: "Quadríceps, Glúteos & Equilíbrio",
        isLeg: true,
        notes: "Fortalece quadríceps e glúteos, trabalhando equilíbrio. O movimento para trás é mais fácil de controlar.",
        defaultWeight: 10,
        visualUrl: "https://musclewiki.com/exercises/male/quadriceps/beginner/dumbbell-reverse-lunge"
      },
      {
        id: "b2",
        name: "2. Desenvolvimento de ombros com halteres",
        sets: 3,
        reps: "8",
        minReps: 8,
        maxReps: 8,
        rest: 90,
        muscle: "Deltoides & Tríceps",
        isLeg: false,
        notes: "Desenvolve deltoides e tríceps. Ajuda na força e resistência dos ombros, bastante exigidos no Muay Thai.",
        defaultWeight: 12,
        visualUrl: "https://musclewiki.com/exercises/male/shoulders/beginner/dumbbell-overhead-press"
      },
      {
        id: "b3",
        name: "3. Puxada alta na polia",
        sets: 3,
        reps: "8–10",
        minReps: 8,
        maxReps: 10,
        rest: 90,
        muscle: "Dorsais & Bíceps",
        isLeg: false,
        notes: "Fortalece dorsais e bíceps. Equilibra o trabalho de empurrar feito nos exercícios de peito e ombros.",
        defaultWeight: 35,
        visualUrl: "https://musclewiki.com/exercises/male/lats/beginner/cable-lat-pulldown"
      },
      {
        id: "b4",
        name: "4. Leg press 45°",
        sets: 3,
        reps: "8–10",
        minReps: 8,
        maxReps: 10,
        rest: 90,
        muscle: "Quadríceps & Glúteos",
        isLeg: true,
        notes: "Permite trabalhar pernas com carga e estabilidade, sem exigir tanto equilíbrio. Substitui exercícios pesados de quadril.",
        defaultWeight: 80,
        visualUrl: "https://musclewiki.com/exercises/male/quadriceps/beginner/leg-press"
      },
      {
        id: "b5",
        name: "5. Face pull na polia",
        sets: 2,
        reps: "12–15",
        minReps: 12,
        maxReps: 15,
        rest: 60,
        muscle: "Deltoide Posterior & Manguito",
        isLeg: false,
        notes: "Trabalha deltoide posterior, trapézio e escápulas. Ajuda na saúde dos ombros e no equilíbrio muscular.",
        defaultWeight: 15,
        visualUrl: "https://musclewiki.com/exercises/male/shoulders/beginner/cable-face-pull"
      }
    ]
  },
  "C": {
    id: "C",
    name: "Treino C — Complemento e Equilíbrio",
    day: "Sexta-feira",
    objective: "Completar o estímulo da semana, trabalhar peito, costas e pernas e fortalecer os ombros.",
    targetTime: "30–40 min",
    exercises: [
      {
        id: "c1",
        name: "1. Supino inclinado com halteres",
        sets: 3,
        reps: "6–8",
        minReps: 6,
        maxReps: 8,
        rest: 120,
        muscle: "Peitoral Superior & Ombros",
        isLeg: false,
        notes: "Dá ênfase à parte superior do peitoral e trabalha ombros e tríceps. Complementa o supino reto do treino A.",
        defaultWeight: 14,
        visualUrl: "https://musclewiki.com/exercises/male/chest/beginner/incline-dumbbell-bench-press"
      },
      {
        id: "c2",
        name: "2. Levantamento terra romeno com halteres",
        sets: 3,
        reps: "6–8",
        minReps: 6,
        maxReps: 8,
        rest: 90,
        muscle: "Posteriores & Glúteos",
        isLeg: true,
        notes: "Reforça posteriores da coxa e glúteos. A repetição intencional garante atenção à cadeia posterior.",
        defaultWeight: 16,
        visualUrl: "https://musclewiki.com/exercises/male/hamstrings/beginner/dumbbell-romanian-deadlift"
      },
      {
        id: "c3",
        name: "3. Remada baixa na polia",
        sets: 3,
        reps: "8–10",
        minReps: 8,
        maxReps: 10,
        rest: 90,
        muscle: "Costas & Bíceps",
        isLeg: false,
        notes: "Desenvolve costas e bíceps, complementando a puxada alta e a remada do treino A.",
        defaultWeight: 35,
        visualUrl: "https://musclewiki.com/exercises/male/lats/beginner/seated-cable-row"
      },
      {
        id: "c4",
        name: "4. Cadeira extensora",
        sets: 2,
        reps: "10–12",
        minReps: 10,
        maxReps: 12,
        rest: 60,
        muscle: "Isolamento de Quadríceps",
        isLeg: true,
        notes: "Isola o quadríceps e complementa o trabalho de pernas. Escolhida por ser prática e rápida na academia.",
        defaultWeight: 30,
        visualUrl: "https://musclewiki.com/exercises/male/quadriceps/beginner/leg-extension"
      },
      {
        id: "c5",
        name: "5. Elevação lateral com halteres",
        sets: 2,
        reps: "10–15",
        minReps: 10,
        maxReps: 15,
        rest: 60,
        muscle: "Deltoides Laterais",
        isLeg: false,
        notes: "Trabalha a parte lateral dos ombros, contribuindo para desenvolvimento e estabilidade da articulação.",
        defaultWeight: 7,
        visualUrl: "https://musclewiki.com/exercises/male/shoulders/beginner/dumbbell-lateral-raise"
      }
    ]
  }
};

const WEEKLY_SCHEDULE = [
  { day: "Segunda-feira", short: "Seg", type: "workout", code: "A", title: "Treino A", desc: "Base de força (Pernas, Peito, Costas, Core)" },
  { day: "Terça-feira", short: "Ter", type: "muay_thai", title: "Muay Thai", desc: "Treino de combate & cardio" },
  { day: "Quarta-feira", short: "Qua", type: "workout", code: "B", title: "Treino B", desc: "Força unilateral & Estabilidade" },
  { day: "Quinta-feira", short: "Qui", type: "muay_thai", title: "Muay Thai", desc: "Treino de combate & cardio" },
  { day: "Sexta-feira", short: "Sex", type: "workout", code: "C", title: "Treino C", desc: "Complemento muscular & Equilíbrio" },
  { day: "Sábado", short: "Sáb", type: "rest", title: "Descanso", desc: "Recuperação ativa ou descanso leve" },
  { day: "Domingo", short: "Dom", type: "rest", title: "Descanso", desc: "Descanso total para a próxima semana" }
];

const STAGE_GOALS = [
  { weeks: [1, 2], title: "Aprender Movimentos", desc: "Aprender os exercícios e encontrar cargas adequadas sem exageros.", color: "text-blue-400", border: "border-blue-500/30" },
  { weeks: [3, 4], title: "Aumentar Repetições", desc: "Aumentar gradualmente as repetições até o topo da faixa prescrita.", color: "text-emerald-400", border: "border-emerald-500/30" },
  { weeks: [5, 6], title: "Subir Cargas", desc: "Aumentar o peso quando atingir o limite máximo de reps em todas as séries.", color: "text-amber-400", border: "border-amber-500/30" },
  { weeks: [7], title: "Consolidar Progressão", desc: "Manter a execução perfeita utilizando as novas cargas atingidas.", color: "text-purple-400", border: "border-purple-500/30" },
  { weeks: [8], title: "Avaliação Final", desc: "Avaliar força, nível de recuperação e desempenho geral nas aulas de Muay Thai.", color: "text-rose-400", border: "border-rose-500/30" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeWorkoutId, setActiveWorkoutId] = useState("A");

  const [currentWeek, setCurrentWeek] = useState(1);
  const [legFatigue, setLegFatigue] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMax, setTimerMax] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [timerLabel, setTimerLabel] = useState("");
  const timerRef = useRef(null);

  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const saved = localStorage.getItem("mt_gym_workout_logs_v2");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {};
  });

  const [exerciseNotes, setExerciseNotes] = useState(() => {
    const saved = localStorage.getItem("mt_gym_exercise_notes_v2");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("mt_gym_workout_logs_v2", JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem("mt_gym_exercise_notes_v2", JSON.stringify(exerciseNotes));
  }, [exerciseNotes]);

  const [currentSession, setCurrentSession] = useState({});

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      clearInterval(timerRef.current);
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } catch (e) {}
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, timerSeconds]);

  const startTimer = (seconds, label = "Descanso") => {
    setTimerMax(seconds);
    setTimerSeconds(seconds);
    setTimerLabel(label);
    setTimerActive(true);
  };

  const toggleTimer = () => {
    if (timerSeconds === 0) setTimerSeconds(60);
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(0);
  };

  const launchWorkout = (workoutKey) => {
    setActiveWorkoutId(workoutKey);
    const wData = WORKOUT_DATA[workoutKey];
    const logKey = `week_${currentWeek}_${workoutKey}`;
    const previousLogs = workoutLogs[logKey] || {};

    const initialSessionState = {};

    wData.exercises.forEach(ex => {
      const numSets = (legFatigue && ex.isLeg) ? Math.max(1, ex.sets - 1) : ex.sets;
      const exPrevious = previousLogs[ex.id];

      initialSessionState[ex.id] = Array.from({ length: numSets }, (_, i) => {
        if (exPrevious && exPrevious[i]) {
          return { ...exPrevious[i] };
        }
        return {
          setNumber: i + 1,
          weight: ex.defaultWeight,
          reps: ex.maxReps,
          completed: false
        };
      });
    });

    setCurrentSession(initialSessionState);
    setActiveTab("workout");
  };

  const updateSetData = (exerciseId, setIdx, field, deltaOrVal) => {
    setCurrentSession(prev => {
      const exSets = [...(prev[exerciseId] || [])];
      if (!exSets[setIdx]) return prev;

      let newVal;
      if (typeof deltaOrVal === "number" && (field === "weight" || field === "reps")) {
        newVal = Math.max(0, (exSets[setIdx][field] || 0) + deltaOrVal);
      } else {
        newVal = deltaOrVal;
      }

      exSets[setIdx] = {
        ...exSets[setIdx],
        [field]: newVal
      };

      return {
        ...prev,
        [exerciseId]: exSets
      };
    });
  };

  const toggleSetComplete = (exerciseId, setIdx, defaultRest) => {
    setCurrentSession(prev => {
      const exSets = [...(prev[exerciseId] || [])];
      if (!exSets[setIdx]) return prev;

      const isCompleted = !exSets[setIdx].completed;
      exSets[setIdx] = {
        ...exSets[setIdx],
        completed: isCompleted
      };

      if (isCompleted) {
        startTimer(defaultRest, "Descanso entre séries");
      }

      return {
        ...prev,
        [exerciseId]: exSets
      };
    });
  };

  const handleNoteChange = (exerciseId, note) => {
    setExerciseNotes(prev => ({
      ...prev,
      [exerciseId]: note
    }));
  };

  const saveCurrentWorkout = () => {
    const logKey = `week_${currentWeek}_${activeWorkoutId}`;
    setWorkoutLogs(prev => ({
      ...prev,
      [logKey]: {
        ...currentSession,
        completedAt: new Date().toISOString()
      }
    }));
    setActiveTab("dashboard");
  };

  const checkProgressionAdvice = (exercise, setsData) => {
    if (!setsData || setsData.length === 0) return null;
    const allCompletedMax = setsData.every(s => s.completed && s.reps >= exercise.maxReps);
    if (allCompletedMax) {
      return `Excelente! Você atingiu ${exercise.maxReps} reps em todas as séries. Suba 1–2kg no próximo treino.`;
    }
    return null;
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.workoutLogs) setWorkoutLogs(parsed.workoutLogs);
          if (parsed.exerciseNotes) setExerciseNotes(parsed.exerciseNotes);
          alert("Dados importados com sucesso!");
        } catch (err) {
          alert("Erro ao importar o arquivo. Verifique se o formato JSON é válido.");
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between max-w-md mx-auto shadow-2xl border-x border-zinc-900 pb-20 select-none">

      {/* HEADER SUPERIOR */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5 fill-emerald-500/20" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Ficha Musculação <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-1.5 py-0.5 rounded">Muay Thai</span>
            </h1>
            <p className="text-[11px] text-zinc-400">30–40 min/sessão • Força & Combate</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700/50">
          <span className="text-xs font-semibold text-zinc-300">Semana</span>
          <select
            value={currentWeek}
            onChange={(e) => setCurrentWeek(Number(e.target.value))}
            aria-label="Selecionar Semana"
            className="bg-transparent text-xs font-bold text-emerald-400 focus:outline-none cursor-pointer"
          >
            {[1,2,3,4,5,6,7,8].map(w => (
              <option key={w} value={w} className="bg-zinc-900 text-white">
                {w}
              </option>
            ))}
          </select>
        </div>
      </header>

      {timerSeconds > 0 && (
        <div className="sticky top-[57px] z-30 bg-zinc-900/95 border-b border-emerald-500/30 px-4 py-2.5 flex items-center justify-between shadow-lg backdrop-blur-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {timerSeconds}s
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{timerLabel}</p>
              <p className="text-[10px] text-zinc-400">Respire fundo para manter o rendimento</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition"
              title={timerActive ? "Pausar" : "Iniciar"}
            >
              {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 py-4 space-y-4">

        {activeTab === "dashboard" && (
          <div className="space-y-4 animate-fadeIn">

            {(() => {
              const currentGoal = STAGE_GOALS.find(g => g.weeks.includes(currentWeek)) || STAGE_GOALS[0];
              return (
                <div className={`p-3.5 rounded-xl bg-zinc-900 border ${currentGoal.border} flex items-start gap-3`}>
                  <div className="p-2 rounded-lg bg-zinc-800/80 text-amber-400 shrink-0 mt-0.5">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                      Fase da Semana {currentWeek}
                    </span>
                    <h2 className="text-sm font-bold text-zinc-100 mt-1">{currentGoal.title}</h2>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{currentGoal.desc}</p>
                  </div>
                </div>
              );
            })()}

            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3 pr-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-200">Cansaço no Muay Thai?</h3>
                  <p className="text-[11px] text-zinc-400">Reduz 1 série de perna para garantir a recuperação</p>
                </div>
              </div>
              <button
                onClick={() => setLegFatigue(!legFatigue)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  legFatigue
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {legFatigue ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                {legFatigue ? "Ativado" : "Ajustar"}
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Sua Rotina Semanal
                </h3>
                <span className="text-[11px] text-zinc-500">30–40 min/dia</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {WEEKLY_SCHEDULE.map((sch, i) => {
                  const logKey = `week_${currentWeek}_${sch.code}`;
                  const isDone = sch.type === "workout" && workoutLogs[logKey]?.completedAt;

                  return (
                    <div
                      key={i}
                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-between text-center transition ${
                        sch.type === "workout"
                          ? isDone
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                            : "bg-zinc-900 border-zinc-800 text-zinc-200"
                          : sch.type === "muay_thai"
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
                            : "bg-zinc-900/40 border-zinc-800/50 text-zinc-500"
                      }`}
                    >
                      <span className="text-[10px] font-medium text-zinc-400">{sch.short}</span>
                      <div className="my-1">
                        {sch.type === "workout" && (
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isDone ? "bg-emerald-500 text-zinc-950" : "bg-zinc-800 text-white"
                          }`}>
                            {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : sch.code}
                          </span>
                        )}
                        {sch.type === "muay_thai" && (
                          <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold">
                            MT
                          </span>
                        )}
                        {sch.type === "rest" && (
                          <span className="text-[10px] font-medium text-zinc-500">Off</span>
                        )}
                      </div>
                      <span className="text-[9px] font-medium truncate w-full">
                        {sch.type === "workout" ? `Treino ${sch.code}` : sch.type === "muay_thai" ? "Luta" : "Folga"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" /> Fichas de Treino
              </h3>

              {Object.keys(WORKOUT_DATA).map((key) => {
                const w = WORKOUT_DATA[key];
                const logKey = `week_${currentWeek}_${key}`;
                const isCompleted = !!workoutLogs[logKey]?.completedAt;

                return (
                  <div
                    key={key}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      }`}>
                        {key}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{w.name}</h4>
                          {isCompleted && (
                            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Concluído
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{w.day} • {w.exercises.length} Exercícios</p>
                      </div>
                    </div>

                    <button
                      onClick={() => launchWorkout(key)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        isCompleted
                          ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                          : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/10"
                      }`}
                    >
                      {isCompleted ? "Refazer" : "Iniciar"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 text-xs leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                <Info className="w-4 h-4 text-emerald-400" /> Diretriz de Evolução
              </div>
              <p>A regra é simples: <strong>primeiro aumente as repetições</strong> até o topo da faixa. Só então aumente o peso dos halteres/polia.</p>
            </div>

          </div>
        )}

        {activeTab === "workout" && (
          <div className="space-y-4 animate-fadeIn">

            <div className="flex items-center justify-between bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Semana {currentWeek} • {WORKOUT_DATA[activeWorkoutId].day}
                </span>
                <h2 className="text-base font-bold text-white">{WORKOUT_DATA[activeWorkoutId].name}</h2>
              </div>
              <button
                onClick={() => setActiveTab("dashboard")}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700"
              >
                Voltar
              </button>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800/80 overflow-x-auto">
              <span className="text-[11px] font-medium text-zinc-400 shrink-0 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Cronômetro:
              </span>
              {[45, 60, 90, 120].map(sec => (
                <button
                  key={sec}
                  onClick={() => startTimer(sec, `Descanso ${sec}s`)}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-300 rounded-lg text-xs font-semibold border border-zinc-700/60 transition"
                >
                  {sec}s
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {WORKOUT_DATA[activeWorkoutId].exercises.map((ex) => {
                const exSets = currentSession[ex.id] || [];
                const advice = checkProgressionAdvice(ex, exSets);
                const isLegReduced = legFatigue && ex.isLeg;
                const userNote = exerciseNotes[ex.id] || "";

                return (
                  <div key={ex.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          {ex.name}
                          {ex.isLeg && <span className="text-[10px] bg-amber-500/10 text-amber-400 font-semibold px-1.5 py-0.5 rounded border border-amber-500/20">Perna</span>}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">{ex.muscle} • Meta: <span className="text-emerald-400 font-semibold">{ex.reps} reps</span></p>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <button
                          onClick={() => startTimer(ex.rest, `Descanso (${ex.rest}s)`)}
                          className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs flex items-center gap-1 border border-zinc-700"
                          title="Timer Sugerido"
                        >
                          <Clock className="w-3.5 h-3.5 text-emerald-400" /> {ex.rest}s
                        </button>

                        <a
                          href={ex.visualUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60"
                        >
                          <ExternalLink className="w-3 h-3" /> Ver Movimento
                        </a>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/80">
                      💡 {ex.notes}
                    </p>

                    <div className="pt-0.5">
                      <input
                        type="text"
                        placeholder="Sua anotação (ex: banco inclinado 30°, halter de 14kg)"
                        value={userNote}
                        onChange={(e) => handleNoteChange(ex.id, e.target.value)}
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {isLegReduced && (
                      <div className="text-[11px] text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Série reduzida temporariamente para preservar suas pernas para a aula de Muay Thai.</span>
                      </div>
                    )}

                    {advice && (
                      <div className="text-[11px] text-emerald-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{advice}</span>
                      </div>
                    )}

                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-12 text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-1">
                        <span className="col-span-2">Série</span>
                        <span className="col-span-4 text-center">Carga (kg)</span>
                        <span className="col-span-4 text-center">Reps</span>
                        <span className="col-span-2 text-right">Status</span>
                      </div>

                      {exSets.map((setData, setIdx) => (
                        <div
                          key={setIdx}
                          className={`grid grid-cols-12 items-center p-2 rounded-xl border transition ${
                            setData.completed
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                              : "bg-zinc-950 border-zinc-800 text-white"
                          }`}
                        >
                          <span className="col-span-2 text-xs font-bold text-zinc-300">
                            #{setIdx + 1}
                          </span>

                          <div className="col-span-4 flex items-center justify-center gap-1">
                            <button
                              onClick={() => updateSetData(ex.id, setIdx, "weight", -1)}
                              className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-xs"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={setData.weight}
                              onChange={(e) => updateSetData(ex.id, setIdx, "weight", Number(e.target.value))}
                              aria-label={`Carga em kg para série ${setIdx + 1}`}
                              className="w-12 text-center bg-zinc-900 border border-zinc-700 rounded py-0.5 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={() => updateSetData(ex.id, setIdx, "weight", 1)}
                              className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <div className="col-span-4 flex items-center justify-center gap-1">
                            <button
                              onClick={() => updateSetData(ex.id, setIdx, "reps", -1)}
                              className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-xs"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={setData.reps}
                              onChange={(e) => updateSetData(ex.id, setIdx, "reps", Number(e.target.value))}
                              aria-label={`Repetições para série ${setIdx + 1}`}
                              className="w-10 text-center bg-zinc-900 border border-zinc-700 rounded py-0.5 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={() => updateSetData(ex.id, setIdx, "reps", 1)}
                              className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <div className="col-span-2 flex justify-end">
                            <button
                              onClick={() => toggleSetComplete(ex.id, setIdx, ex.rest)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                                setData.completed
                                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700"
                              }`}
                            >
                              <Check className={`w-4 h-4 ${setData.completed ? "stroke-[3]" : ""}`} />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={saveCurrentWorkout}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> Concluir & Salvar Treino
              </button>
            </div>

          </div>
        )}

        {activeTab === "week_plan" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Fases da Progressão (8 Semanas)
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Manter a mesma ficha durante 8 semanas é fundamental para avaliar sua evolução real sem trocar exercícios constantemente.
              </p>
            </div>

            <div className="space-y-2.5">
              {STAGE_GOALS.map((stage, idx) => {
                const isActive = stage.weeks.includes(currentWeek);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition ${
                      isActive
                        ? "bg-zinc-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5"
                        : "bg-zinc-900/40 border-zinc-800/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold ${stage.color}`}>
                        Semanas {stage.weeks.join(" e ")}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Sua fase atual
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{stage.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Exemplo Prático de Evolução
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Supino reto com halteres (prescrito em 3 × 6–8):
              </p>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                <li><strong className="text-zinc-100">Semana 1:</strong> 8 kg — 6, 6, 6 repetições</li>
                <li><strong className="text-zinc-100">Semana 2:</strong> 8 kg — 7, 7, 6 repetições</li>
                <li><strong className="text-zinc-100">Semana 3:</strong> 8 kg — 8, 8, 8 repetições</li>
                <li><strong className="text-emerald-400">Próximo Treino:</strong> Aumente o peso e volte a 6 repetições!</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">Histórico & Backup</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Dados salvos localmente no dispositivo</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ workoutLogs, exerciseNotes }, null, 2));
                    const downloadAnchor = document.createElement("a");
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `treino_muay_thai_backup.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-bold border border-zinc-700 flex items-center gap-1.5"
                  title="Exportar dados em formato JSON"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> Exportar
                </button>

                <label className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-bold border border-zinc-700 flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-amber-400" /> Importar
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>

            {Object.keys(workoutLogs).length === 0 ? (
              <div className="p-8 text-center text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">Nenhum treino concluído ainda. Selecione um treino no Início!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(workoutLogs).map(([logKey, logData]) => {
                  const [_, weekNum, workoutCode] = logKey.split("_");
                  const wInfo = WORKOUT_DATA[workoutCode];
                  if (!wInfo) return null;

                  return (
                    <div key={logKey} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="text-xs font-bold text-emerald-400">
                          Semana {weekNum} • Treino {workoutCode}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {logData.completedAt ? new Date(logData.completedAt).toLocaleDateString("pt-BR") : ""}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {wInfo.exercises.map(ex => {
                          const sets = logData[ex.id] || [];
                          if (sets.length === 0) return null;
                          return (
                            <div key={ex.id} className="text-xs flex items-center justify-between text-zinc-300">
                              <span className="truncate pr-2">{ex.name.split(".")[1] || ex.name}</span>
                              <span className="font-mono text-zinc-400 shrink-0">
                                {sets.map(s => `${s.weight}kg×${s.reps}`).join(" | ")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-4 border-t border-zinc-900">
              <button
                onClick={() => {
                  if (window.confirm("Deseja apagar todo o histórico de treinos salvo?")) {
                    setWorkoutLogs({});
                    localStorage.removeItem("mt_gym_workout_logs_v2");
                  }
                }}
                className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs rounded-xl border border-rose-500/20 flex items-center justify-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Limpar Histórico do Aparelho
              </button>
            </div>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Guia & Filosofia da Ficha
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Esta ficha foi criada para evoluir sua musculatura e força sem sobrecarregar sua recuperação para os treinos de luta.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                <h3 className="text-xs font-bold text-emerald-400">1. Por que a escolha por halteres?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Evita perda de tempo em aparelhos disputados e melhora a força em cada braço/perna de forma individual, corrigindo desequilíbrios musculares.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                <h3 className="text-xs font-bold text-emerald-400">2. Qual o descanso recomendado?</h3>
                <ul className="text-xs text-zinc-400 space-y-1">
                  <li>• <strong>Exercícios Principais:</strong> 90 a 120 segundos</li>
                  <li>• <strong>Exercícios Complementares:</strong> 60 a 90 segundos</li>
                  <li>• <strong>Isoladores e Core:</strong> 45 a 60 segundos</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                <h3 className="text-xs font-bold text-emerald-400">3. Preciso ir até a falha em todas as séries?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Não. Termine a maioria das séries sentindo que conseguiria fazer mais 2 repetições com boa postura. Isso preserva seu sistema nervoso para o Muay Thai.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                <h3 className="text-xs font-bold text-emerald-400">4. Ajuste de Cansaço (Fadiga de Pernas)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Se sentir que as pernas estão pesadas para o Muay Thai, ative o botão de fadiga na tela inicial. Ele subtrai 1 série dos exercícios de membros inferiores automaticamente.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 max-w-md mx-auto px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
            activeTab === "dashboard" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button
          onClick={() => setActiveTab("workout")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
            activeTab === "workout" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Treino</span>
        </button>

        <button
          onClick={() => setActiveTab("week_plan")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
            activeTab === "week_plan" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Fases</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
            activeTab === "history" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Histórico</span>
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
            activeTab === "guide" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Guia</span>
        </button>
      </nav>

    </div>
  );
}
