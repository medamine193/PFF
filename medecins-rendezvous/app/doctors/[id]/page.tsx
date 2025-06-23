"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Star, ThumbsUp, Video } from "lucide-react"

// Mock data for a doctor
const mockDoctor = {
  id: 1,
  name: "Dr. Sophie Martin",
  specialization: "Médecine générale",
  address: "123 Avenue de la République, 75011 Paris",
  phone: "+33 1 23 45 67 89",
  rating: 4.8,
  reviewCount: 124,
  image: "/placeholder.svg?height=400&width=400",
  price: "25€",
  languages: ["Français", "Anglais"],
  education: [
    { degree: "Doctorat en Médecine", institution: "Université Paris Descartes", year: "2010" },
    { degree: "Spécialisation en Médecine Générale", institution: "Hôpital Necker", year: "2013" },
  ],
  experience: [
    { position: "Médecin généraliste", location: "Cabinet médical du Marais, Paris", period: "2013 - Présent" },
    { position: "Médecin remplaçant", location: "Divers cabinets, Île-de-France", period: "2010 - 2013" },
  ],
  about:
    "Le Dr. Sophie Martin est médecin généraliste depuis plus de 10 ans. Elle pratique une médecine centrée sur le patient, prenant en compte tous les aspects de la santé physique et mentale. Elle est particulièrement intéressée par la prévention et l'éducation à la santé.",
  services: ["Consultation générale", "Suivi de grossesse", "Vaccination", "Certificats médicaux", "Téléconsultation"],
  availability: [
    { day: "Lundi", hours: "09:00 - 18:00" },
    { day: "Mardi", hours: "09:00 - 18:00" },
    { day: "Mercredi", hours: "09:00 - 12:00" },
    { day: "Jeudi", hours: "09:00 - 18:00" },
    { day: "Vendredi", hours: "09:00 - 16:00" },
  ],
  reviews: [
    {
      id: 1,
      name: "Jean Dupont",
      rating: 5,
      date: "15/03/2023",
      comment: "Excellent médecin, très à l'écoute et professionnel.",
    },
    {
      id: 2,
      name: "Marie Lambert",
      rating: 4,
      date: "02/02/2023",
      comment: "Consultation efficace, bon diagnostic et conseils utiles.",
    },
    {
      id: 3,
      name: "Sophie Moreau",
      rating: 5,
      date: "18/01/2023",
      comment: "Très bonne prise en charge, médecin attentif et compétent.",
    },
  ],
}

// Mock available slots for booking
const mockAvailableSlots = [
  { date: "2023-06-15", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { date: "2023-06-16", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
  { date: "2023-06-17", slots: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
  { date: "2023-06-18", slots: ["10:00", "11:00", "14:00", "15:00"] },
  { date: "2023-06-19", slots: ["09:00", "10:00", "11:00", "14:00", "16:00"] },
]

export default function DoctorDetailPage() {
  const params = useParams()
  const doctorId = params.id
  const doctor = mockDoctor // In a real app, fetch doctor by ID

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [consultationType, setConsultationType] = useState("inperson")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor profile */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden relative flex-shrink-0 mx-auto md:mx-0">
                  <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-yellow-500 mr-2">
                      <Star className="fill-yellow-500 h-4 w-4" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({doctor.reviewCount} avis)</span>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>{doctor.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      Conventionné secteur 1
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50">
                      Carte Vitale
                    </Badge>
                    {doctor.languages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="about" className="mt-8">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="about">À propos</TabsTrigger>
                  <TabsTrigger value="experience">Expérience</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Présentation</h3>
                    <p className="text-muted-foreground">{doctor.about}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Horaires d'ouverture</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {doctor.availability.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{item.day}</span>
                          <span className="text-muted-foreground">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Formation</h3>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Parcours professionnel</h3>
                    <div className="space-y-4">
                      {doctor.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <p className="font-medium">{exp.position}</p>
                          <p className="text-muted-foreground">{exp.location}</p>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services">
                  <h3 className="text-lg font-semibold mb-3">Services proposés</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {doctor.services.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 rounded-full p-3 mr-3">
                      <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{doctor.rating}/5</div>
                      <div className="text-sm text-muted-foreground">{doctor.reviewCount} avis vérifiés</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {doctor.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Booking section */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Prendre rendez-vous</h2>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Tarif de consultation</span>
                  <span className="font-bold">{doctor.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">Conventionné secteur 1, carte vitale acceptée</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Type de consultation</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={consultationType === "inperson" ? "default" : "outline"}
                      className={consultationType === "inperson" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      onClick={() => setConsultationType("inperson")}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Au cabinet
                    </Button>
                    <Button
                      variant={consultationType === "video" ? "default" : "outline"}
                      className={consultationType === "video" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      onClick={() => setConsultationType("video")}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Vidéo
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Sélectionnez une date</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {mockAvailableSlots.map((dateSlot, index) => (
                      <Button
                        key={index}
                        variant={selectedDate === dateSlot.date ? "default" : "outline"}
                        className={`flex flex-col py-2 ${selectedDate === dateSlot.date ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        onClick={() => {
                          setSelectedDate(dateSlot.date)
                          setSelectedSlot("")
                        }}
                      >
                        <span className="text-xs">{dateSlot.date.split("-")[2]}</span>
                        <span className="text-xs">Juin</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Sélectionnez un horaire</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {mockAvailableSlots
                        .find((d) => d.date === selectedDate)
                        ?.slots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={selectedSlot === slot ? "default" : "outline"}
                            className={selectedSlot === slot ? "bg-blue-600 hover:bg-blue-700" : ""}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!selectedDate || !selectedSlot}>
                <Calendar className="h-4 w-4 mr-2" />
                Confirmer le rendez-vous
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
