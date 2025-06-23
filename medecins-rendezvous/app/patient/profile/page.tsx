"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Camera, FileText, Lock, Mail, Phone, Save, User } from "lucide-react"
import Sidebar from "@/components/Sidebar"

// Mock patient data
const patientData = {
  id: 1,
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
  phone: "+33 6 12 34 56 78",
  birthDate: "1985-06-15",
  gender: "male",
  address: "123 Rue de Paris, 75001 Paris",
  bloodType: "A+",
  allergies: "Pénicilline",
  chronicConditions: "Hypertension",
  currentMedications: "Lisinopril 10mg",
  emergencyContact: {
    name: "Marie Dupont",
    relationship: "Épouse",
    phone: "+33 6 98 76 54 32",
  },
  image: "/placeholder.svg?height=200&width=200",
  documents: [
    { id: 1, name: "Ordonnance_20230505.pdf", date: "05/05/2023", type: "Ordonnance" },
    { id: 2, name: "Analyse_sang_20230420.pdf", date: "20/04/2023", type: "Analyse" },
    { id: 3, name: "Radiographie_20230315.pdf", date: "15/03/2023", type: "Radiographie" },
  ],
  notifications: {
    email: true,
    sms: true,
    appointments: true,
    reminders: true,
    marketing: false,
  },
}

export default function PatientProfilePage() {
  const [profile, setProfile] = useState(patientData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the profile
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="patient" />

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Mon profil</h1>
              <p className="text-muted-foreground">Gérez vos informations personnelles et médicales</p>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Modifier</Button>
            )}
          </header>

          <Tabs defaultValue="personal">
            <TabsList className="mb-8">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="medical">Informations médicales</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Vos informations de contact et détails personnels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src={profile.image || "/placeholder.svg"}
                          alt={`${profile.firstName} ${profile.lastName}`}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      {isEditing && (
                        <div className="absolute bottom-0 right-0">
                          <Button size="icon" variant="outline" className="rounded-full bg-white h-8 w-8">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profile.firstName}
                              onChange={handleInputChange}
                              className="pl-10"
                              disabled={!isEditing}
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
                              value={profile.lastName}
                              onChange={handleInputChange}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date de naissance</Label>
                      <Input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={profile.birthDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Genre</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Homme</SelectItem>
                          <SelectItem value="female">Femme</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact d'urgence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Nom complet</Label>
                        <Input
                          id="emergencyName"
                          name="name"
                          value={profile.emergencyContact.name}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">Relation</Label>
                        <Input
                          id="emergencyRelationship"
                          name="relationship"
                          value={profile.emergencyContact.relationship}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Téléphone</Label>
                        <Input
                          id="emergencyPhone"
                          name="phone"
                          value={profile.emergencyContact.phone}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Informations médicales</CardTitle>
                  <CardDescription>Vos antécédents médicaux et informations de santé</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Groupe sanguin</Label>
                      <Select
                        value={profile.bloodType}
                        onValueChange={(value) => handleSelectChange("bloodType", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      name="allergies"
                      placeholder="Listez vos allergies connues"
                      value={profile.allergies}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chronicConditions">Conditions chroniques</Label>
                    <Textarea
                      id="chronicConditions"
                      name="chronicConditions"
                      placeholder="Listez vos conditions médicales chroniques"
                      value={profile.chronicConditions}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Médicaments actuels</Label>
                    <Textarea
                      id="currentMedications"
                      name="currentMedications"
                      placeholder="Listez les médicaments que vous prenez actuellement"
                      value={profile.currentMedications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents médicaux</CardTitle>
                  <CardDescription>Vos ordonnances, résultats d'analyses et autres documents médicaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Ajouter un document
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {profile.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{doc.type}</span>
                              <span className="mx-2">•</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                          <Button variant="ghost" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Gérez vos préférences de notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications par email</p>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                      </div>
                      <Switch
                        checked={profile.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications par SMS</p>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
                      </div>
                      <Switch
                        checked={profile.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rappels de rendez-vous</p>
                        <p className="text-sm text-muted-foreground">Recevoir des rappels pour vos rendez-vous</p>
                      </div>
                      <Switch
                        checked={profile.notifications.reminders}
                        onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Communications marketing</p>
                        <p className="text-sm text-muted-foreground">Recevoir des offres et actualités</p>
                      </div>
                      <Switch
                        checked={profile.notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                    <CardDescription>Gérez vos paramètres de sécurité et de confidentialité</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="currentPassword" type="password" className="pl-10" disabled={!isEditing} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="newPassword" type="password" className="pl-10" disabled={!isEditing} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" type="password" className="pl-10" disabled={!isEditing} />
                      </div>
                    </div>

                    {isEditing && <Button className="w-full">Mettre à jour le mot de passe</Button>}

                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-2">Actions du compte</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Exporter mes données
                        </Button>
                        <Button variant="destructive" className="w-full">
                          Supprimer mon compte
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
