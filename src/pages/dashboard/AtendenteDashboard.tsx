import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  LogOut, 
  MessageCircle, 
  Clock, 
  User,
  Send,
  MessageSquare,
  Instagram,
  Mail,
  Facebook,
  CheckCircle,
  Calendar,
  Bell
} from "lucide-react";

// Dados simulados de conversas em andamento
const filaAtendimento = [
  {
    id: 1,
    paciente: "Ana Silva",
    canal: "WhatsApp",
    icon: MessageSquare,
    ultimaMensagem: "Preciso reagendar minha consulta",
    tempo: "2 min atrás",
    prioridade: "alta",
    status: "aguardando"
  },
  {
    id: 2,
    paciente: "Carlos Santos",
    canal: "Instagram",
    icon: Instagram,
    ultimaMensagem: "Qual o resultado do meu exame?",
    tempo: "5 min atrás",
    prioridade: "media",
    status: "aguardando"
  },
  {
    id: 3,
    paciente: "Maria Oliveira",
    canal: "E-mail",
    icon: Mail,
    ultimaMensagem: "Consulta confirmada, obrigada!",
    tempo: "10 min atrás",
    prioridade: "baixa",
    status: "finalizado"
  },
];

const respostasRapidas = [
  "Olá! Como posso ajudá-lo(a) hoje?",
  "Sua consulta está confirmada para amanhã às 14h",
  "Vou verificar o status do seu exame",
  "Obrigado pelo contato! Tenha um ótimo dia!",
];

const AtendenteDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [conversaAtiva, setConversaAtiva] = useState<any>(null);
  const [mensagem, setMensagem] = useState("");
  const [atendimentosHoje, setAtendimentosHoje] = useState(12);
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

  const iniciarAtendimento = (conversa: any) => {
    setConversaAtiva(conversa);
    toast({
      title: "Atendimento iniciado",
      description: `Conversa com ${conversa.paciente} via ${conversa.canal}`,
    });
  };

  const enviarMensagem = () => {
    if (!mensagem.trim() || !conversaAtiva) return;
    
    toast({
      title: "Mensagem enviada",
      description: `Resposta enviada para ${conversaAtiva.paciente}`,
    });
    setMensagem("");
    setAtendimentosHoje(prev => prev + 1);
  };

  const finalizarAtendimento = () => {
    if (!conversaAtiva) return;
    
    toast({
      title: "Atendimento finalizado",
      description: `Conversa com ${conversaAtiva.paciente} foi concluída`,
    });
    setConversaAtiva(null);
  };

  const agendarConsulta = () => {
    if (!conversaAtiva) return;
    
    toast({
      title: "Consulta agendada",
      description: `Consulta marcada para ${conversaAtiva.paciente}`,
    });
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
              <div className="h-10 w-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">MediConnect</h1>
                <p className="text-sm text-muted-foreground">Painel do Atendente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-success-foreground">Online</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{user.nome}</p>
                <p className="text-sm text-muted-foreground">{atendimentosHoje} atendimentos hoje</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Fila de Atendimento */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Fila de Atendimento
                </CardTitle>
                <CardDescription>
                  {filaAtendimento.filter(f => f.status === 'aguardando').length} pendentes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  <div className="p-4 space-y-3">
                    {filaAtendimento.map((conversa) => {
                      const IconComponent = conversa.icon;
                      return (
                        <div
                          key={conversa.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                            conversaAtiva?.id === conversa.id 
                              ? 'bg-primary/10 border-primary' 
                              : 'bg-card hover:bg-muted/50'
                          }`}
                          onClick={() => iniciarAtendimento(conversa)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-gradient-secondary flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{conversa.paciente}</span>
                                <Badge className={getPrioridadeColor(conversa.prioridade)}>
                                  {conversa.prioridade}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {conversa.ultimaMensagem}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {conversa.tempo}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Principal */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft h-full flex flex-col">
              {conversaAtiva ? (
                <>
                  {/* Header da Conversa */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{conversaAtiva.paciente}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <conversaAtiva.icon className="h-4 w-4" />
                            {conversaAtiva.canal}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={agendarConsulta}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Agendar
                        </Button>
                        <Button size="sm" onClick={finalizarAtendimento}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Finalizar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Área de Mensagens */}
                  <CardContent className="flex-1 p-4">
                    <ScrollArea className="h-80 mb-4">
                      <div className="space-y-4">
                        {/* Mensagem do Paciente */}
                        <div className="flex justify-start">
                          <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-muted">
                            <p className="text-sm">{conversaAtiva.ultimaMensagem}</p>
                            <p className="text-xs text-muted-foreground mt-1">{conversaAtiva.tempo}</p>
                          </div>
                        </div>
                        
                        {/* Exemplo de resposta do atendente */}
                        <div className="flex justify-end">
                          <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gradient-primary text-white">
                            <p className="text-sm">Olá! Estou aqui para ajudá-lo. Vou verificar sua solicitação.</p>
                            <p className="text-xs opacity-80 mt-1">Agora</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>

                    {/* Input de Mensagem */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                        className="flex-1"
                      />
                      <Button onClick={enviarMensagem} disabled={!mensagem.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                    <p className="text-muted-foreground">
                      Escolha um atendimento da fila para começar
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Painel Lateral - Respostas Rápidas e Ações */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Respostas Rápidas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Respostas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {respostasRapidas.map((resposta, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-xs"
                      onClick={() => setMensagem(resposta)}
                    >
                      {resposta}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métricas Rápidas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Métricas do Dia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Atendimentos</span>
                  <Badge variant="secondary">{atendimentosHoje}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo médio</span>
                  <Badge variant="secondary">3.2 min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Satisfação</span>
                  <Badge className="bg-success">95%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">2 consultas para confirmar</p>
                  <p className="text-muted-foreground">1 exame para entregar</p>
                  <p className="text-muted-foreground">Sistema atualizado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AtendenteDashboard;