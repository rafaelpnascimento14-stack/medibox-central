import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, MessageCircle, Calendar, BarChart3, User, UserPlus } from "lucide-react";
import medicalLogo from "@/assets/medical-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="mx-auto h-20 w-20 rounded-2xl flex items-center justify-center shadow-medical mb-8 overflow-hidden">
          <img src={medicalLogo} alt="MediConnect Logo" className="w-full h-full object-cover" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">MediConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Sistema de Atendimento Omnichannel para Clínicas Médicas
          </p>
          <p className="text-muted-foreground">
            Unifique todos os canais de atendimento em uma única plataforma profissional
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-medical transition-all duration-300"
            onClick={() => window.location.href = '/login'}
          >
            <User className="h-5 w-5 mr-2" />
            Fazer Login
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.location.href = '/cadastro'}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Cadastro Paciente
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Omnichannel</h3>
              <p className="text-sm text-muted-foreground">
                WhatsApp, Instagram, E-mail e Chat unificados
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Agendamento</h3>
              <p className="text-sm text-muted-foreground">
                Marcação inteligente de consultas
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-info mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Métricas de atendimento em tempo real
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
