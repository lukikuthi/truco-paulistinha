import { Team, HandValue } from '@/types/truco';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinishHandButtonsProps {
  currentValue: HandValue;
  onFinish: (winner: Team) => void;
  disabled?: boolean;
}

export function FinishHandButtons({ currentValue, onFinish, disabled }: FinishHandButtonsProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <span className="text-center text-sm uppercase tracking-widest text-muted-foreground">
        Quem venceu a mão? (+{currentValue} pontos)
      </span>

      <div className="flex gap-3 sm:gap-4">
        <Button
          onClick={() => onFinish('A')}
          disabled={disabled}
          className={cn(
            'flex-1 h-12 sm:h-14 text-sm sm:text-lg font-bold uppercase tracking-wider btn-truco px-2 sm:px-4',
            'bg-team-a hover:bg-team-a/90 text-team-a-foreground'
          )}
        >
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Equipe A</span>
        </Button>

        <Button
          onClick={() => onFinish('B')}
          disabled={disabled}
          className={cn(
            'flex-1 h-12 sm:h-14 text-sm sm:text-lg font-bold uppercase tracking-wider btn-truco px-2 sm:px-4',
            'bg-team-b hover:bg-team-b/90 text-team-b-foreground'
          )}
        >
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Equipe B</span>
        </Button>
      </div>
    </div>
  );
}
