import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface DoctorCardProps {
  doctor: {
    id: number
    firstname: string
    lastname: string
    specialization: string
    address: string
    rating: number
    reviewCount: number
    nextAvailable: string
    image: string
    price: string
    languages: string[]
  }
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const fullName = `${doctor.firstname} ${doctor.lastname}`

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Image */}
          <div className="relative w-full md:w-48 h-48 md:h-auto">
            <Image
              src={doctor.image || "/placeholder.svg"}
              alt={fullName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{fullName}</h2>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>

                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.address}</span>
                </div>

                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground ml-1">({doctor.reviewCount} avis)</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <div className="flex items-center md:justify-end mb-2">
                  <Calendar className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium">
                    Disponible: <span className="text-green-600">{doctor.nextAvailable}</span>
                  </span>
                </div>
                <div className="text-lg font-bold text-blue-600">{doctor.price}</div>
                <div className="text-xs text-muted-foreground">Tarif de consultation</div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-sm">
                  <Languages className="h-4 w-4 mr-1" />
                  <span className="font-medium mr-1">Langues:</span>
                  {Array.isArray(doctor.languages) && doctor.languages.length > 0 ? (
                    doctor.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="mr-1">
                        {language}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Langues non renseignées</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild className="flex-1">
                  <Link href={`/patient/book?doctor=${doctor.id}`}>Prendre rendez-vous</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/doctors/${doctor.id}`}>Voir le profil</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
