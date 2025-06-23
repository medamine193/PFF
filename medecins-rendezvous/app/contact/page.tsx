import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Vous avez des questions ou besoin d'assistance ? Notre équipe est là pour vous aider.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-muted-foreground mb-2">Du lundi au vendredi, 9h-18h</p>
              <a href="tel:+33123456789" className="text-blue-600 hover:underline">
                +33 1 23 45 67 89
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground mb-2">Nous répondons sous 24h</p>
              <a href="mailto:contact@medecins-rendezvous.fr" className="text-blue-600 hover:underline">
                contact@medecins-rendezvous.fr
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-muted-foreground mb-2">Siège social</p>
              <address className="not-italic">
                123 Avenue de la Santé
                <br />
                75001 Paris, France
              </address>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Sujet de votre message" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Votre message" rows={6} />
              </div>

              <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                Envoyer le message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Foire aux questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "Comment puis-je prendre rendez-vous avec un médecin ?",
              answer:
                "Vous pouvez prendre rendez-vous en créant un compte, en recherchant un médecin par spécialité ou localisation, puis en sélectionnant un créneau disponible dans son agenda.",
            },
            {
              question: "Comment annuler ou modifier un rendez-vous ?",
              answer:
                "Connectez-vous à votre compte, accédez à la section 'Mes rendez-vous', puis cliquez sur le rendez-vous que vous souhaitez modifier ou annuler. Vous pouvez effectuer ces changements jusqu'à 24h avant le rendez-vous.",
            },
            {
              question: "Les médecins sur votre plateforme sont-ils vérifiés ?",
              answer:
                "Oui, tous les médecins présents sur notre plateforme sont vérifiés. Nous contrôlons leurs diplômes et leur inscription à l'Ordre des Médecins avant de valider leur profil.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
