import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Clock, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Prenez rendez-vous avec un médecin en quelques clics
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Trouvez facilement un médecin près de chez vous et réservez votre consultation en ligne, 24h/24 et 7j/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/doctors">
                  <Button size="lg" className="w-full sm:w-auto">
                    Trouver un médecin
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow-xl p-6 md:p-8">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="Médecin consultant un patient"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue-100 dark:bg-blue-900 rounded-lg p-4 shadow-lg hidden md:block">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      +10,000 rendez-vous pris
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Notre plateforme simplifie la prise de rendez-vous médicaux en trois étapes simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Recherchez un médecin</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trouvez un médecin par spécialité, localisation ou disponibilité selon vos besoins.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Choisissez une date</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sélectionnez le créneau qui vous convient parmi les disponibilités du médecin.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Confirmez votre rendez-vous</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recevez une confirmation par email et des rappels avant votre consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nos spécialités médicales</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Consultez des médecins dans de nombreuses spécialités pour tous vos besoins de santé.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Médecine générale",
              "Cardiologie",
              "Dermatologie",
              "Gynécologie",
              "Ophtalmologie",
              "Pédiatrie",
              "Psychiatrie",
              "Orthopédie",
              "Neurologie",
              "Dentisterie",
              "ORL",
              "Endocrinologie",
            ].map((specialty, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-gray-900 dark:text-white">{specialty}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/doctors">
              <Button variant="outline">Voir toutes les spécialités</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à prendre rendez-vous avec un médecin ?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez les milliers de patients qui font confiance à notre plateforme pour leurs rendez-vous médicaux.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Créer un compte
                </Button>
              </Link>
              <Link href="/doctors">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                >
                  Trouver un médecin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
