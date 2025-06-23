"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search } from "lucide-react"
import DoctorCard from "@/components/DoctorCard"
import axios from "axios"

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("all")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [availability, setAvailability] = useState("all")

  const [doctors, setDoctors] = useState<any[]>([])

  useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors")

   const formattedDoctors = response.data.map((doc: any) => ({
  id: doc.id,
  name: doc.firstName && doc.lastName ? `${doc.firstName} ${doc.lastName}` : doc.name || "Nom non renseigné",
  specialization: doc.specialty || "Spécialité non renseignée",  
  address: doc.address || "",
  rating: doc.rating || 0,
  reviewCount: doc.reviewCount || 0,
  nextAvailable: doc.nextAvailable || "",
  image: doc.image || "/placeholder.svg",
  price: doc.price || "",
  languages: doc.languages || [],
}));
setDoctors(formattedDoctors);


      setDoctors(formattedDoctors)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    }
  }

  fetchDoctors()
}, [])



  const filteredDoctors = doctors.filter((doctor: any) => {
  const doctorName = doctor.name ?? ""
  const doctorSpecialization = doctor.specialization ?? ""
  const doctorAddress = doctor.address ?? ""
  const doctorAvailability = doctor.availability ?? ""

  const matchesSearch =
    doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctorSpecialization.toLowerCase().includes(searchTerm.toLowerCase())

  const matchesSpecialization =
    specialization === "all" || doctorSpecialization === specialization

  const matchesLocation =
    location === "" || doctorAddress.toLowerCase().includes(location.toLowerCase())

  const price = parseInt(doctor.price || "0", 10)
  const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

  const matchesAvailability =
    availability === "all" || doctorAvailability === availability

  return (
    matchesSearch &&
    matchesSpecialization &&
    matchesLocation &&
    matchesPrice &&
    matchesAvailability
  )
})


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Trouver un médecin</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger>
              <SelectValue placeholder="Disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les disponibilités</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="tomorrow">Demain</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="nextweek">Semaine prochaine</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            Tarif de consultation: {priceRange[0]}€ - {priceRange[1]}€
          </h3>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={5}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
        </div>
      </div>

      {/* Result count */}
      <div className="mb-4">
        <p className="text-muted-foreground">{filteredDoctors.length} médecins trouvés</p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}
