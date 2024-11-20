import React, { useState, useEffect, useRef } from 'react';
import alarmSound from '../assets/sounds/clock-alarm-8761.mp3';

const Timer = () => {
  const [selectedTimer, setSelectedTimer] = useState('pomodoro');
  const [timerDuration, setTimerDuration] = useState(25 * 60); // 25 minutos
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalId = useRef(null); // Usando useRef para armazenar o intervalo de forma persistente

  // Carrega o estado salvo do localStorage
  useEffect(() => {
    const savedTimer = JSON.parse(localStorage.getItem('timerState'));
    if (savedTimer) {
      setTimerDuration(savedTimer.timerDuration);  // Restaurando o tempo restante
      setSelectedTimer(savedTimer.selectedTimer);
      setPomodoroCount(savedTimer.pomodoroCount);
      setIsPaused(savedTimer.isPaused);
    }
  }, []);

  // Salva o estado do timer no localStorage
  useEffect(() => {
    localStorage.setItem('timerState', JSON.stringify({
      timerDuration,
      selectedTimer,
      pomodoroCount,
      isPaused,
    }));
  }, [timerDuration, selectedTimer, pomodoroCount, isPaused]);

  // Atualiza a exibição do temporizador no formato MM:SS
  const updateTimerDisplay = () => {
    const minutes = Math.floor(timerDuration / 60).toString().padStart(2, '0');
    const seconds = (timerDuration % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSelectTimer = (timer) => {
    clearInterval(intervalId.current); // Para o temporizador atual antes de iniciar outro
    setIsPaused(false);
    if (timer === 'pomodoro') setTimerDuration(25 * 60); // 25 minutos
    else if (timer === 'short-break') setTimerDuration(5 * 60); // 5 minutos
    else if (timer === 'long-break') setTimerDuration(30 * 60); // 30 minutos
    setSelectedTimer(timer);
  };

  // Inicia ou retoma o temporizador
  const startTimer = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      clearInterval(intervalId.current); // Garante que não haja múltiplos intervalos
    }

    intervalId.current = setInterval(() => {
      setTimerDuration((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId.current); // Para o temporizador quando chega a 0
          setPomodoroCount((count) => count + 1);
          setTimerDuration(selectedTimer === 'pomodoro' ? 25 * 60 : 5 * 60);

          // Reproduz som antes do alerta
          const sound = new Audio(alarmSound);
          sound.play();

          // Mostra o alerta com atraso
          setTimeout(() => {
            alert('Tempo esgotado!');
          }, 1000);

          return 0; // Reseta o tempo
        }
        return prev - 1; // Decrementa o tempo a cada segundo
      });
    }, 1000);
  };

  // Pausa o temporizador
  const pauseTimer = () => {
    clearInterval(intervalId.current);
    setIsPaused(true);
  };

  // Reinicia o temporizador e o modo selecionado
  const resetTimer = () => {
    clearInterval(intervalId.current);
    setIsPaused(false);
    handleSelectTimer(selectedTimer);
  };

  return (
    <div className="container-timer">
      <div>
        <button onClick={() => handleSelectTimer('pomodoro')} className={`modality ${selectedTimer === 'pomodoro' ? 'active-button' : ''}`}>Pomodoro</button>
        <button onClick={() => handleSelectTimer('short-break')} className={`modality ${selectedTimer === 'short-break' ? 'active-button' : ''}`}>Intervalo Curto</button>
        <button onClick={() => handleSelectTimer('long-break')} className={`modality ${selectedTimer === 'long-break' ? 'active-button' : ''}`}>Intervalo Longo</button>
      </div>
      <div>
        <p id="counter">{updateTimerDisplay()}</p>
      </div>
      <div>
        <button onClick={startTimer} className="start">Começar</button>
      </div>
      <div className="button-group">
        <button onClick={pauseTimer} className="pause">Pausar</button>
        <button onClick={resetTimer} className="restart">Recomeçar</button>
      </div>
    </div>
  );
};

export default Timer;
