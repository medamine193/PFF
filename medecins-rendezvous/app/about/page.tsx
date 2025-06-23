import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, Heart, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">À propos de Médecins Rendez-vous</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Notre mission est de simplifier l'accès aux soins de santé pour tous en connectant patients et médecins sur
          une plateforme intuitive et sécurisée.
        </p>
      </div>

      {/* Notre histoire */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Médecins Rendez-vous est né d'un constat simple : la difficulté pour de nombreux patients de trouver et
              prendre rendez-vous avec des médecins qualifiés.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Fondée en 2023 par une équipe de professionnels de la santé et d'experts en technologie, notre plateforme
              vise à révolutionner la prise de rendez-vous médicaux en France.
            </p>
            <p className="text-lg text-muted-foreground">
              Aujourd'hui, nous connectons des milliers de patients avec des médecins de toutes spécialités, offrant une
              solution simple et efficace pour la gestion des rendez-vous médicaux.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="L'équipe de Médecins Rendez-vous"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-slate-50 rounded-xl mb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="text-blue-600 h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Accessibilité</h3>
                <p className="text-center text-muted-foreground">
                  Nous croyons que l'accès aux soins de santé est un droit fondamental. Notre plateforme est conçue pour
                  être accessible à tous.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-blue-600 h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Confidentialité</h3>
                <p className="text-center text-muted-foreground">
                  La protection de vos données personnelles et médicales est notre priorité absolue. Nous respectons les
                  normes les plus strictes en matière de sécurité.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Award className="text-blue-600 h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Excellence</h3>
                <p className="text-center text-muted-foreground">
                  Nous nous engageons à offrir un service de la plus haute qualité, tant pour les patients que pour les
                  médecins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Notre équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Dr. Sophie Martin", role: "Fondatrice & CEO" },
            { name: "Thomas Dubois", role: "CTO" },
            { name: "Dr. Pierre Leroy", role: "Directeur Médical" },
            { name: "Camille Bernard", role: "Responsable Marketing" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-blue-600 rounded-xl text-white mb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Médecins Rendez-vous en chiffres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-xl">Patients satisfaits</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Award className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">1,500+</div>
              <p className="text-xl">Médecins certifiés</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <p className="text-xl">Rendez-vous pris</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
