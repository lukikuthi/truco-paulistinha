import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrucoMatch } from '@/hooks/useTrucoMatch';
import { ScorePanel } from '@/components/truco/ScorePanel';
import { HandValueButton } from '@/components/truco/HandValueButton';
import { FinishHandButtons } from '@/components/truco/FinishHandButtons';
import { MatchHistory } from '@/components/truco/MatchHistory';
import { ConfirmModal } from '@/components/truco/ConfirmModal';
import { VictoryModal } from '@/components/truco/VictoryModal';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home } from 'lucide-react';
export default function Match() {
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);
  const {
    match,
    incrementScore,
    decrementScore,
    cycleHandValue,
    finishHand,
    resetMatch
  } = useTrucoMatch();
  const isFinished = match.status === 'finished';
  const handleReset = () => {
    resetMatch();
    setShowResetModal(false);
  };
  return <div className="min-h-screen wood-texture flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
          <Home className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-bold text-primary text-shadow-sm">Truco Paulistinha</h1>

        <Button variant="ghost" size="icon" onClick={() => setShowResetModal(true)} className="text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4 max-w-2xl mx-auto w-full">
        <section className="flex gap-4">
          <ScorePanel team="A" teamName="Equipe A" score={match.scoreA} onIncrement={() => incrementScore('A')} onDecrement={() => decrementScore('A')} disabled={isFinished} isWinner={match.winner === 'A'} />
          <ScorePanel team="B" teamName="Equipe B" score={match.scoreB} onIncrement={() => incrementScore('B')} onDecrement={() => decrementScore('B')} disabled={isFinished} isWinner={match.winner === 'B'} />
        </section>

        <section className="score-card flex flex-col items-center gap-6 py-6">
          <HandValueButton value={match.currentHandValue} onCycle={cycleHandValue} disabled={isFinished} />

          <div className="w-full border-t border-border/50 pt-6">
            <FinishHandButtons currentValue={match.currentHandValue} onFinish={finishHand} disabled={isFinished} />
          </div>
        </section>

        <section>
          <MatchHistory history={match.history} />
        </section>
      </main>

      <ConfirmModal open={showResetModal} onOpenChange={setShowResetModal} title="Reiniciar Partida?" description="Todo o progresso será perdido. Esta ação não pode ser desfeita." confirmLabel="Reiniciar" onConfirm={handleReset} />

      <VictoryModal open={isFinished} winner={match.winner} scoreA={match.scoreA} scoreB={match.scoreB} onNewMatch={resetMatch} />

      <footer className="py-3 text-center border-t border-border/30 mt-4">
        <p className="text-xs text-muted-foreground">
          Voce gostou desse projeto? Acompanhe mais em meu{' '}
          <a
            href="https://www.linkedin.com/in/lucas-kikuthi-866358246/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>;
}