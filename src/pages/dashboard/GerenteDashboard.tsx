import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  LogOut, 
  BarChart3, 
  Users, 
  MessageCircle, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Timer,
  Star
} from "lucide-react";

// Dados simulados de métricas
const metricas = {
  atendimentosHoje: 47,
  tempoMedioResposta: 2.3,
  satisfacaoGeral: 94,
  atendentesOnline: 3,
  filaEspera: 5,
  resolucaoTaxa: 89
};

// Dados simulados de atendentes
const atendentes = [
  {
    id: 1,
    nome: "Heloisa Capistrano",
    status: "online",
    atendimentosHoje: 15,
    tempoMedio: 2.1,
    satisfacao: 96,
    ultimaAtividade: "Agora"
  },
  {
    id: 2,
    nome: "João Silva",
    status: "online", 
    atendimentosHoje: 18,
    tempoMedio: 2.8,
    satisfacao: 92,
    ultimaAtividade: "2 min atrás"
  },
  {
    id: 3,
    nome: "Maria Santos",
    status: "ausente",
    atendimentosHoje: 14,
    tempoMedio: 1.9,
    satisfacao: 98,
    ultimaAtividade: "15 min atrás"
  },
];

// Dados de conversas críticas
const conversasCriticas = [
  {
    id: 1,
    paciente: "Ana Silva",
    atendente: "Heloisa Capistrano",
    tempo: "8 min",
    prioridade: "alta",
    motivo: "Reclamação sobre atendimento"
  },
  {
    id: 2,
    paciente: "Carlos Santos",
    atendente: "João Silva",
    tempo: "12 min",
    prioridade: "media",
    motivo: "Problema com agendamento"
  },
];

const GerenteDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logout realizado",
      description: "Até logo!"
    });
    navigate('/login');
  };

  const assumirAtendimento = (conversa: any) => {
    toast({
      title: "Atendimento assumido",
      description: `Você assumiu o atendimento de ${conversa.paciente}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'ausente': return 'bg-warning';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-destructive';
      case 'media': return 'bg-warning';
      case 'baixa': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">MediConnect</h1>
                <p className="text-sm text-muted-foreground">Dashboard Gerencial</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.nome}</p>
                <p className="text-sm text-muted-foreground">Gerente</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metricas.atendimentosHoje}</p>
                  <p className="text-sm text-muted-foreground">Atendimentos Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                  <Timer className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metricas.tempoMedioResposta}m</p>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-success rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metricas.satisfacaoGeral}%</p>
                  <p className="text-sm text-muted-foreground">Satisfação</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-info rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metricas.atendentesOnline}</p>
                  <p className="text-sm text-muted-foreground">Online Agora</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Performance dos Atendentes */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Performance dos Atendentes
                </CardTitle>
                <CardDescription>
                  Monitoramento em tempo real da equipe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atendentes.map((atendente) => (
                    <div
                      key={atendente.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(atendente.status)}`}></div>
                        </div>
                        <div>
                          <h4 className="font-medium">{atendente.nome}</h4>
                          <p className="text-sm text-muted-foreground">
                            {atendente.atendimentosHoje} atendimentos • {atendente.ultimaAtividade}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{atendente.tempoMedio}m</p>
                          <p className="text-xs text-muted-foreground">Tempo médio</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">{atendente.satisfacao}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Satisfação</p>
                        </div>
                        <Badge className={getStatusColor(atendente.status)}>
                          {atendente.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Conversas Críticas e Ações */}
          <div className="space-y-6">
            
            {/* Conversas Críticas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Atenção Requerida
                </CardTitle>
                <CardDescription>
                  {conversasCriticas.length} situações críticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {conversasCriticas.map((conversa) => (
                      <div
                        key={conversa.id}
                        className="p-3 rounded-lg border bg-warning/5 border-warning/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{conversa.paciente}</span>
                          <Badge className={getPrioridadeColor(conversa.prioridade)}>
                            {conversa.prioridade}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Atendente: {conversa.atendente}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {conversa.motivo}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {conversa.tempo}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => assumirAtendimento(conversa)}
                          >
                            Assumir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Resumo da Fila */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Status da Fila
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Em espera</span>
                  <Badge variant="secondary">{metricas.filaEspera}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Em atendimento</span>
                  <Badge className="bg-info">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taxa de resolução</span>
                  <Badge className="bg-success">{metricas.resolucaoTaxa}%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatório Completo
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Equipe
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Análise de Tendências
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GerenteDashboard;