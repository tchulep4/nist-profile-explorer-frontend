
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-3xl text-center space-y-6 px-4">
        <h1 className="text-4xl font-bold md:text-6xl">NIST Framework Profile Explorer</h1>
        <p className="text-xl text-gray-600">
          Manage and track your cybersecurity framework implementation with ease
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate(user ? '/dashboard' : '/auth')}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </Button>
          {!user && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
