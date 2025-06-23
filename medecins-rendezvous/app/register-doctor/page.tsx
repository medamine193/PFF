"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon, LockKeyhole, Mail, Upload, User } from "lucide-react"

export default function RegisterDoctorPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialization: "",
    licenseNumber: "",
    phone: "",
    address: "",
    bio: "",
    acceptTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/doctors/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur d'inscription");
    }

    router.push("/login");
  } catch (error: any) {
    alert(error.message);
  }
};


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Inscription Médecin</CardTitle>
            <CardDescription className="text-center">
              Créez votre compte professionnel pour gérer vos rendez-vous en ligne
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Prénom"
                      className="pl-10"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Nom"
                      className="pl-10"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email-pro.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Spécialité</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("specialization", value)}
                    value={formData.specialization}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Médecine générale</SelectItem>
                      <SelectItem value="cardiology">Cardiologie</SelectItem>
                      <SelectItem value="dermatology">Dermatologie</SelectItem>
                      <SelectItem value="neurology">Neurologie</SelectItem>
                      <SelectItem value="pediatrics">Pédiatrie</SelectItem>
                      <SelectItem value="psychiatry">Psychiatrie</SelectItem>
                      <SelectItem value="orthopedics">Orthopédie</SelectItem>
                      <SelectItem value="gynecology">Gynécologie</SelectItem>
                      <SelectItem value="ophthalmology">Ophtalmologie</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Numéro RPPS</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="Votre numéro RPPS"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone professionnel</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse du cabinet</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Adresse complète de votre cabinet"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie professionnelle</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Décrivez votre parcours, vos spécialités et votre approche..."
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Documents professionnels</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Déposez votre diplôme et votre carte professionnelle
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Parcourir les fichiers
                  </Button>
                  <Input id="documents" type="file" multiple className="hidden" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                  required
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte les{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Créer mon compte professionnel
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Vous avez déjà un compte ? </span>
              <Link href="/login" className="text-blue-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
