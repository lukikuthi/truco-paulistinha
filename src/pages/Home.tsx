import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
export default function Home() {
  const navigate = useNavigate();
  return <div className="min-h-screen wood-texture flex flex-col items-center justify-center p-6">
      <div className="score-card max-w-md w-full text-center space-y-8 animate-scale-in">
        <div className="space-y-2">
          <div className="text-6xl mb-4">🃏</div>
          <h1 className="text-4xl font-bold text-primary text-shadow-lg tracking-tight">Truco Paulistinha</h1>
          <p className="text-muted-foreground text-lg">
            Marcador de Pontos
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-foreground/80 text-sm leading-relaxed">
            Controle a pontuação da sua partida de truco de forma prática.
            Marque os pontos, controle o valor das mãos e acompanhe o histórico.
          </p>
        </div>

        <Button onClick={() => navigate('/partida')} size="lg" className="w-full h-16 text-xl font-bold uppercase tracking-widest btn-truco bg-primary hover:bg-primary/90 text-primary-foreground">
          <Play className="h-6 w-6 mr-3" />
          Iniciar Partida
        </Button>

        <div className="pt-4 text-xs text-muted-foreground">Desenvolvido por @lukikuthi.dev  | LinkedIn: <a href="https://www.linkedin.com/in/lucas-kikuthi-866358246/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary" > Lucas Kikuthi </a> </div>
      </div>
    </div>;
}