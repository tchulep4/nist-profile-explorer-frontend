
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DemoBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            🚀 Experience the Full NIST Framework Management
          </h3>
          <p className="text-blue-700 mt-1">
            This demo shows sample data. Sign up to manage your real cybersecurity framework implementation.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/auth')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Start Free Trial
        </Button>
      </div>
    </div>
  );
};

export default DemoBanner;
