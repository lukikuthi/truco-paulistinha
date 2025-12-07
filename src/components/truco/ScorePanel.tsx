import { useState, useEffect } from 'react';
import { Team } from '@/types/truco';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScorePanelProps {
  team: Team;
  teamName: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  isWinner?: boolean;
}

export function ScorePanel({
  team,
  teamName,
  score,
  onIncrement,
  onDecrement,
  disabled,
  isWinner,
}: ScorePanelProps) {
  const [animate, setAnimate] = useState(false);
  const [prevScore, setPrevScore] = useState(score);

  useEffect(() => {
    if (score !== prevScore) {
      setAnimate(true);
      setPrevScore(score);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [score, prevScore]);

  const teamColor = team === 'A' ? 'team-a' : 'team-b';

  return (
    <div
      className={cn(
        'score-card flex flex-col items-center gap-4 flex-1',
        isWinner && 'ring-4 ring-primary pulse-glow'
      )}
    >
      <h2
        className={cn(
          'text-xl font-bold uppercase tracking-widest text-shadow-sm',
          team === 'A' ? 'text-team-a' : 'text-team-b'
        )}
      >
        {teamName}
      </h2>

      <div
        className={cn(
          'text-7xl font-bold tabular-nums text-shadow-lg',
          animate && 'score-change',
          team === 'A' ? 'text-team-a' : 'text-team-b'
        )}
      >
        {score}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full border-2 btn-truco',
            'hover:bg-muted/50 active:bg-muted'
          )}
          onClick={onDecrement}
          disabled={disabled || score === 0}
        >
          <Minus className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full border-2 btn-truco',
            'hover:bg-muted/50 active:bg-muted'
          )}
          onClick={onIncrement}
          disabled={disabled || score >= 12}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
