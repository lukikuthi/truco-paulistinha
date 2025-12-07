import { MatchHistoryEntry } from '@/types/truco';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface MatchHistoryProps {
  history: MatchHistoryEntry[];
}

export function MatchHistory({ history }: MatchHistoryProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (history.length === 0) {
    return (
      <div className="score-card">
        <h3 className="text-center text-lg font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Histórico
        </h3>
        <p className="text-center text-muted-foreground text-sm italic">
          Nenhuma mão finalizada ainda
        </p>
      </div>
    );
  }

  return (
    <div className="score-card">
      <h3 className="text-center text-lg font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Histórico
      </h3>

      <ScrollArea className="h-48">
        <div className="space-y-2">
          {history.map((entry, index) => (
            <div
              key={entry.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                'bg-muted/30 border border-border/50',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'text-sm font-bold uppercase px-2 py-1 rounded',
                    entry.winner === 'A'
                      ? 'bg-team-a/20 text-team-a'
                      : 'bg-team-b/20 text-team-b'
                  )}
                >
                  Equipe {entry.winner}
                </span>
                <span className="text-foreground font-semibold">
                  +{entry.points} pts
                </span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="h-3 w-3" />
                {formatTime(entry.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
