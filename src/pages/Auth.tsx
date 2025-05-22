
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { user, signIn, signUp, resetPassword, loading } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      await resetPassword(email);
      return;
    }
    
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, fullName);
    }
  };

  const renderForgotPassword = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Reset Password"}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => setIsForgotPassword(false)}
      >
        Back to Login
      </Button>
    </form>
  );

  const renderAuthForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required={!isLogin}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          {isLogin && (
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot password?
            </Button>
          )}
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isForgotPassword
              ? "Reset Password"
              : isLogin
              ? "Sign In"
              : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {isForgotPassword
              ? "Enter your email to receive a password reset link"
              : "Enter your details to access the NIST Framework Profile Explorer"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isForgotPassword ? renderForgotPassword() : renderAuthForm()}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            NIST Framework Profile Explorer &copy; {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
