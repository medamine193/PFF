"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Calendar,
  User,
  UserPlus,
  Activity,
  DollarSign,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/Sidebar"

export default function AdminDashboard() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userType="admin" />

      <div className="flex-1 ml-[70px] md:ml-64">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
              <p className="text-muted-foreground">Bienvenue sur le panneau d'administration de Médecins Rendez-vous</p>
            </div>

            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> +12.5%
                  </span>{" "}
                  depuis le mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,257</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> +8.2%
                  </span>{" "}
                  depuis le mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Médecins actifs</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> +4.3%
                  </span>{" "}
                  depuis le mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€24,580</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 font-medium flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> -2.1%
                  </span>{" "}
                  depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Vue d'ensemble des dernières activités sur la plateforme</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <UserPlus className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Nouveau médecin inscrit</p>
                        <span className="text-xs text-muted-foreground">Il y a 12 min</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Dr. Philippe Durand s'est inscrit en tant que cardiologue
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Rendez-vous confirmé</p>
                        <span className="text-xs text-muted-foreground">Il y a 35 min</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sophie Martin a confirmé son rendez-vous avec Dr. Laurent
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Problème signalé</p>
                        <span className="text-xs text-muted-foreground">Il y a 1h</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Un utilisateur a signalé un problème avec le système de paiement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-full">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Rendez-vous annulé</p>
                        <span className="text-xs text-muted-foreground">Il y a 2h</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Thomas Bernard a annulé son rendez-vous avec Dr. Moreau
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Pic d'activité détecté</p>
                        <span className="text-xs text-muted-foreground">Il y a 3h</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Augmentation de 45% des recherches pour "dermatologues"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Gérez facilement votre plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un médecin
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Gérer les utilisateurs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Voir les rendez-vous
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rapports et statistiques
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Problèmes signalés
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Aperçu des rendez-vous</CardTitle>
                <CardDescription>Statut des rendez-vous pour aujourd'hui</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Rechercher un rendez-vous..."
                  className="max-w-[300px]"
                  startIcon={<Search className="h-4 w-4" />}
                />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-4">
                  <TabsTrigger value="upcoming">
                    <Clock className="h-4 w-4 mr-2" />À venir ({12})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Terminés ({8})
                  </TabsTrigger>
                  <TabsTrigger value="cancelled">
                    <XCircle className="h-4 w-4 mr-2" />
                    Annulés ({3})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-3 bg-muted/50 text-sm font-medium">
                      <div>Patient</div>
                      <div>Médecin</div>
                      <div>Date & Heure</div>
                      <div>Type</div>
                      <div>Statut</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-6 p-3 items-center text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>P{i}</AvatarFallback>
                            </Avatar>
                            <span>Patient {i}</span>
                          </div>
                          <div>Dr. Nom {i}</div>
                          <div>
                            <div>Aujourd'hui</div>
                            <div className="text-xs text-muted-foreground">{10 + i}:00</div>
                          </div>
                          <div>
                            {i % 2 === 0 ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                Téléconsultation
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                En cabinet
                              </Badge>
                            )}
                          </div>
                          <div>
                            <Badge className="bg-amber-500 hover:bg-amber-600">En attente</Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="completed">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-3 bg-muted/50 text-sm font-medium">
                      <div>Patient</div>
                      <div>Médecin</div>
                      <div>Date & Heure</div>
                      <div>Type</div>
                      <div>Statut</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-6 p-3 items-center text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>P{i}</AvatarFallback>
                            </Avatar>
                            <span>Patient {i + 5}</span>
                          </div>
                          <div>Dr. Nom {i + 5}</div>
                          <div>
                            <div>Aujourd'hui</div>
                            <div className="text-xs text-muted-foreground">{8 + i}:00</div>
                          </div>
                          <div>
                            {i % 2 === 0 ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                Téléconsultation
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                En cabinet
                              </Badge>
                            )}
                          </div>
                          <div>
                            <Badge className="bg-green-500 hover:bg-green-600">Terminé</Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cancelled">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-3 bg-muted/50 text-sm font-medium">
                      <div>Patient</div>
                      <div>Médecin</div>
                      <div>Date & Heure</div>
                      <div>Type</div>
                      <div>Statut</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2].map((i) => (
                        <div key={i} className="grid grid-cols-6 p-3 items-center text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>P{i}</AvatarFallback>
                            </Avatar>
                            <span>Patient {i + 8}</span>
                          </div>
                          <div>Dr. Nom {i + 8}</div>
                          <div>
                            <div>Aujourd'hui</div>
                            <div className="text-xs text-muted-foreground">{14 + i}:00</div>
                          </div>
                          <div>
                            {i % 2 === 0 ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                Téléconsultation
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                En cabinet
                              </Badge>
                            )}
                          </div>
                          <div>
                            <Badge className="bg-red-500 hover:bg-red-600">Annulé</Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exporter les données</Button>
              <Link href="/admin/appointments">
                <Button>
                  Voir tous les rendez-vous
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
