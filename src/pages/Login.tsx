import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, Users, UserCheck } from "lucide-react";

// Simulação de dados dos usuários
const users = [
  { id: 1, nome: "Rafael Pinheiro", email: "rafaelpnascimento@14gmail.com", telefone: "65 992880639", cpf: null, perfil: "gerente", senha: "141004" },
  { id: 2, nome: "Heloisa Capistrano", email: "helocapistrano10@gmail.com", telefone: "65 999579409", cpf: null, perfil: "atendente", senha: "061006" },
  { id: 3, nome: "Karine Pinheiro", email: "rn4364729@gmail.com", telefone: "65 999035659", cpf: "12345678900", perfil: "paciente", senha: "130597" }
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      // Salvar dados do usuário no localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${user.nome}`,
      });

      // Redirecionar baseado no perfil
      switch (user.perfil) {
        case 'paciente':
          navigate('/dashboard/paciente');
          break;
        case 'atendente':
          navigate('/dashboard/atendente');
          break;
        case 'gerente':
          navigate('/dashboard/gerente');
          break;
        default:
          navigate('/');
      }
    } else {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medical mb-6">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">MediConnect</h1>
          <p className="text-muted-foreground mt-2">Sistema de Atendimento Omnichannel</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Entrar na plataforma</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-medical transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Novo paciente?
              </p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/cadastro')}
              >
                Cadastre-se
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Users Info */}
        <Card className="shadow-soft bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários de Demonstração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-card">
              <UserCheck className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Gerente: rafaelpnascimento@14gmail.com</p>
                <p className="text-muted-foreground">Senha: 141004</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-card">
              <UserCheck className="h-4 w-4 text-secondary" />
              <div className="text-sm">
                <p className="font-medium">Atendente: helocapistrano10@gmail.com</p>
                <p className="text-muted-foreground">Senha: 061006</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;