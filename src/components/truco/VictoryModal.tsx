import { Team } from '@/types/truco';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VictoryModalProps {
  open: boolean;
  winner: Team | undefined;
  scoreA: number;
  scoreB: number;
  onNewMatch: () => void;
}

export function VictoryModal({
  open,
  winner,
  scoreA,
  scoreB,
  onNewMatch,
}: VictoryModalProps) {
  if (!winner) return null;

  return (
    <Dialog open={open}>
      <DialogContent className="score-card border-4 border-primary max-w-sm" hideCloseButton>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy
              className={cn(
                'h-20 w-20',
                winner === 'A' ? 'text-team-a' : 'text-team-b'
              )}
            />
          </div>
          <DialogTitle className="text-3xl text-center">
            Vitória!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            <span
              className={cn(
                'font-bold',
                winner === 'A' ? 'text-team-a' : 'text-team-b'
              )}
            >
              Equipe {winner}
            </span>{' '}
            venceu a partida!
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-8 py-4">
          <div className="text-center">
            <span className="text-sm text-muted-foreground uppercase">Equipe A</span>
            <div className="text-4xl font-bold text-team-a">{scoreA}</div>
          </div>
          <div className="text-3xl text-muted-foreground self-center">×</div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground uppercase">Equipe B</span>
            <div className="text-4xl font-bold text-team-b">{scoreB}</div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onNewMatch}
            className="w-full h-12 text-lg font-bold uppercase bg-primary hover:bg-primary/90"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Nova Partida
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
