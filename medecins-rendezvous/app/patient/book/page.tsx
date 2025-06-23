"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Search, Video } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import DoctorCard from "@/components/DoctorCard"
import axios from "axios"



interface Doctor {
  id: number
  firstname: string
  lastname: string
  name: string 
  specialization: string
  address?: string
  rating?: number
  reviewCount?: number
  nextAvailable?: string
  image?: string
  price?: string
  languages?: string[]
}

const mockAvailableSlots = [
  { date: "2023-06-15", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { date: "2023-06-16", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
  { date: "2023-06-17", slots: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
  { date: "2023-06-18", slots: ["10:00", "11:00", "14:00", "15:00"] },
  { date: "2023-06-19", slots: ["09:00", "10:00", "11:00", "14:00", "16:00"] },
]

export default function PatientBookPage() {
const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [location, setLocation] = useState("")
  const [consultationType, setConsultationType] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [bookingStep, setBookingStep] = useState(1)

 useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors")

   const formattedDoctors = response.data.map((doc: any) => ({
          id: doc.id,
          firstname: doc.firstName || "",
          lastname: doc.lastName || "",
          name: `${doc.firstName || ""} ${doc.lastName || ""}`.trim() || "Nom non renseigné",
          specialization: doc.specialty || "Spécialité non renseignée",
          address: doc.address || "",
          rating: doc.rating || 0,
          reviewCount: doc.reviewCount || 0,
          nextAvailable: doc.nextAvailable || "",
          image: doc.image || "/placeholder.svg",
          price: doc.price || "",
          languages: doc.languages || [],
        }))
        setDoctors(formattedDoctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((doctor: any) => {
  const name = doctor.name ?? ""
  const specializationField = doctor.specialization ?? ""
  const addressField = doctor.address ?? ""

  const matchesSearch =
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specializationField.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesSpecialization = specialization === "" || specializationField === specialization
  const matchesLocation = location === "" || addressField.includes(location)

  return matchesSearch && matchesSpecialization && matchesLocation
})


  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId)
    setBookingStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedSlot("")
  }

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
  }

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedSlot,
      type: consultationType,
    })

    setBookingStep(3)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="patient" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Prendre rendez-vous</h1>
            <p className="text-muted-foreground">Trouvez un médecin et réservez votre consultation</p>
          </header>

          {bookingStep === 1 && (
            <>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un médecin ou une spécialité"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select value={specialization} onValueChange={setSpecialization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Spécialité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les spécialités</SelectItem>
                        <SelectItem value="Médecine générale">Médecine générale</SelectItem>
                        <SelectItem value="Cardiologie">Cardiologie</SelectItem>
                        <SelectItem value="Dermatologie">Dermatologie</SelectItem>
                        <SelectItem value="Pédiatrie">Pédiatrie</SelectItem>
                        <SelectItem value="Psychiatrie">Psychiatrie</SelectItem>
                        <SelectItem value="Orthopédie">Orthopédie</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ville ou code postal"
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <Tabs defaultValue="all" onValueChange={setConsultationType}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="all">Tous</TabsTrigger>
                        <TabsTrigger value="video">Téléconsultation</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-4">
                <p className="text-muted-foreground">{filteredDoctors.length} médecins trouvés</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredDoctors.map((doctor: any) => (
                  <div key={doctor.id} onClick={() => handleDoctorSelect(doctor.id)} className="cursor-pointer">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            </>
          )}

          {bookingStep === 2 && selectedDoctor && (
            <Card>
              <CardHeader>
                <CardTitle>Choisir un créneau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  {doctors
                    .filter((d: any) => d.id === selectedDoctor)
                    .map((doctor: any) => (
                      <div key={doctor.id} className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">{doctor.name}</h3>
                          <p className="text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" onClick={() => setBookingStep(1)}>
                          Changer de médecin
                        </Button>
                      </div>
                    ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Type de consultation</h3>
                    <div className="grid grid-cols-2 gap-4">
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
                        Téléconsultation
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Sélectionnez une date</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {mockAvailableSlots.map((dateSlot, index) => (
                        <Button
                          key={index}
                          variant={selectedDate === dateSlot.date ? "default" : "outline"}
                          className={`flex flex-col py-3 ${selectedDate === dateSlot.date ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          onClick={() => handleDateSelect(dateSlot.date)}
                        >
                          <span className="text-sm">{dateSlot.date.split("-")[2]}</span>
                          <span className="text-xs">Juin</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Sélectionnez un horaire</h3>
                      <div className="grid grid-cols-4 gap-4">
                        {mockAvailableSlots
                          .find((d) => d.date === selectedDate)
                          ?.slots.map((slot, index) => (
                            <Button
                              key={index}
                              variant={selectedSlot === slot ? "default" : "outline"}
                              className={selectedSlot === slot ? "bg-blue-600 hover:bg-blue-700" : ""}
                              onClick={() => handleSlotSelect(slot)}
                            >
                              {slot}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-8">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!selectedDate || !selectedSlot}
                      onClick={handleConfirmBooking}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Confirmer le rendez-vous
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {bookingStep === 3 && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Rendez-vous confirmé !</h2>
                <p className="text-muted-foreground mb-6">
                  Votre rendez-vous a été planifié avec succès. Vous recevrez un email de confirmation.
                </p>
                <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-lg mb-6">
                  <div className="text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Médecin:</span>
                      <span>{doctors.find((d: any) => d.id === selectedDoctor)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Heure:</span>
                      <span>{selectedSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <span>{consultationType === "inperson" ? "Au cabinet" : "Téléconsultation"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/patient/appointments">Voir mes rendez-vous</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/patient/dashboard">Retour au tableau de bord</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
