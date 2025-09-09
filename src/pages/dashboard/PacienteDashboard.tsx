import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  MessageCircle, 
  Clock, 
  Activity, 
  LogOut, 
  Plus,
  MessageSquare,
  Instagram,
  Mail,
  Facebook
} from "lucide-react";

// Dados simulados de conversas
const conversas = [
  {
    id: 1,
    canal: "WhatsApp",
    icon: MessageSquare,
    ultimaMensagem: "Consulta agendada para amanhã às 14h",
    tempo: "2 horas atrás",
    status: "respondido"
  },
  {
    id: 2,
    canal: "E-mail",
    icon: Mail,
    ultimaMensagem: "Resultado do exame disponível",
    tempo: "1 dia atrás",
    status: "pendente"
  },
  {
    id: 3,
    canal: "Instagram",
    icon: Instagram,
    ultimaMensagem: "Obrigada pelo atendimento!",
    tempo: "3 dias atrás",
    status: "finalizado"
  },
];

// Dados simulados de consultas
const consultas = [
  {
    id: 1,
    medico: "Dr. João Silva",
    especialidade: "Cardiologia",
    data: "2024-01-10",
    horario: "14:00",
    status: "agendada"
  },
  {
    id: 2,
    medico: "Dra. Maria Santos",
    especialidade: "Dermatologia",
    data: "2024-01-05",
    horario: "10:30",
    status: "realizada"
  },
];

const PacienteDashboard = () => {
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

  const handleAgendarConsulta = () => {
    toast({
      title: "Agendamento iniciado",
      description: "Em breve você será redirecionado para a agenda médica",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-warning';
      case 'respondido': return 'bg-success';
      case 'finalizado': return 'bg-muted';
      case 'agendada': return 'bg-info';
      case 'realizada': return 'bg-success';
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
                <p className="text-sm text-muted-foreground">Portal do Paciente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.nome}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Seção Principal */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Ações Rápidas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  Principais funcionalidades do seu portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    className="h-16 bg-gradient-primary hover:shadow-medical transition-all duration-300"
                    onClick={handleAgendarConsulta}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Agendar Consulta</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16"
                    onClick={() => toast({
                      title: "Em desenvolvimento",
                      description: "Chat em tempo real em breve!"
                    })}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Iniciar Chat</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Conversas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Histórico de Conversas
                </CardTitle>
                <CardDescription>
                  Suas conversas em todos os canais de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {conversas.map((conversa) => {
                      const IconComponent = conversa.icon;
                      return (
                        <div
                          key={conversa.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{conversa.canal}</h4>
                              <Badge className={getStatusColor(conversa.status)}>
                                {conversa.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {conversa.ultimaMensagem}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {conversa.tempo}
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

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Próximas Consultas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Consultas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultas.map((consulta) => (
                    <div
                      key={consulta.id}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{consulta.medico}</span>
                        <Badge className={getStatusColor(consulta.status)}>
                          {consulta.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {consulta.especialidade}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(consulta.data).toLocaleDateString('pt-BR')} às {consulta.horario}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informações do Perfil */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Nome</p>
                  <p className="text-sm text-muted-foreground">{user.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{user.telefone}</p>
                </div>
                {user.cpf && (
                  <div>
                    <p className="text-sm font-medium">CPF</p>
                    <p className="text-sm text-muted-foreground">{user.cpf}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PacienteDashboard;