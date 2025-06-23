import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video } from "lucide-react"
import { cn } from "@/lib/utils"

type AppointmentAction = {
  label: string
  href: string
}

type AppointmentStatus = "confirmed" | "completed" | "cancelled"
type AppointmentType = "Au cabinet" | "Téléconsultation"

type AppointmentProps = {
  appointment: {
    id: number
    doctor: {
      name: string
      specialization: string
      image?: string
    }
    date: string
    time: string
    type: string
    status: AppointmentStatus
  }
  actions?: AppointmentAction[]
}


const statusStyles: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmed: {
    label: "Confirmé",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  completed: {
    label: "Terminé",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-red-100 text-red-800 border-red-200",
  },
}

export default function AppointmentCard({ appointment, actions = [] }: AppointmentProps) {
  const { doctor, date, time, type, status } = appointment
  const { label, className } = statusStyles[status]

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border">
              <Image
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{doctor.name}</h3>
              <p className="text-muted-foreground text-sm">{doctor.specialization}</p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{time}</span>
            </div>
            <div className="flex items-center">
              {type === "Au cabinet" ? (
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              ) : (
                <Video className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <span>{type}</span>
            </div>
          </div>

          {/* Status */}
          <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium border", className)}>
            {label}
          </Badge>
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={idx === 0 ? "default" : "outline"}
                size="sm"
                className={idx === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
                asChild
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
