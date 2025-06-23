"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon, LockKeyhole, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (userType: string) => async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let endpoint = '';
    if (userType === 'admin') endpoint = '/auth/login';
    else if (userType === 'patient') endpoint = '/auth/patient/login';
    else if (userType === 'doctor') endpoint = '/auth/doctor/login';

    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // pour admin, adapte selon le DTO
    });

    if (!response.ok) throw new Error('Échec de la connexion');

    const data = await response.json();
    console.log('Token reçu:', data.access_token);

    // Stocke le token dans localStorage ou dans un context
    localStorage.setItem('token', data.access_token);

    // Redirection
    if (userType === 'admin') router.push('/admin');
    if (userType === 'patient') router.push('/patient/dashboard');
    if (userType === 'doctor') router.push('/doctor/dashboard');
  } catch (error) {
    console.error(error);
    alert('Erreur de connexion');
  }
};


  const LoginForm = ({ userType }: { userType: string }) => (
    <form onSubmit={handleSubmit(userType)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`email-${userType}`}>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id={`email-${userType}`}
            type="email"
            placeholder="votre@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`password-${userType}`}>Mot de passe</Label>
          <Link href="#" className="text-sm text-blue-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id={`password-${userType}`}
            type={showPassword ? "text" : "password"}
            className="pl-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeIcon className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Se connecter
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Vous n'avez pas de compte ? </span>
        {userType === "patient" && (
          <Link href="/register" className="text-blue-600 hover:underline">
            Créer un compte patient
          </Link>
        )}
        {userType === "doctor" && (
          <Link href="/register-doctor" className="text-blue-600 hover:underline">
            Créer un compte médecin
          </Link>
        )}
        {userType === "admin" && <span className="text-muted-foreground">Contactez l'administrateur</span>}
      </div>
    </form>
  )

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous à votre compte pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="doctor">Médecin</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="patient">
                <LoginForm userType="patient" />
              </TabsContent>

              <TabsContent value="doctor">
                <LoginForm userType="doctor" />
              </TabsContent>

              <TabsContent value="admin">
                <LoginForm userType="admin" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
