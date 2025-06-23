"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Search, Calendar, User, MessageSquare, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatBox from "@/components/ChatBox"
import Sidebar from "@/components/Sidebar"

// Mock data for patients
const patients = [
  {
    id: 1,
    name: "Sophie Martin",
    lastMessage: "Merci docteur, à bientôt !",
    time: "10:23",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    name: "Thomas Bernard",
    lastMessage: "J'ai une question concernant mon traitement...",
    time: "Hier",
    unread: 2,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 3,
    name: "Emma Petit",
    lastMessage: "Bonjour Dr. Laurent, je voudrais prendre un rendez-vous",
    time: "Hier",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 4,
    name: "Lucas Dubois",
    lastMessage: "Les médicaments fonctionnent bien, merci",
    time: "Lun",
    unread: 0,
    image: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 5,
    name: "Chloé Moreau",
    lastMessage: "Est-ce que je peux prendre ce médicament avec mon traitement actuel ?",
    time: "Dim",
    unread: 1,
    image: "/placeholder.svg?height=40&width=40",
    online: false,
  },
]

// Mock chat messages for a selected patient
const chatMessages = [
  {
    id: 1,
    sender: "doctor",
    content: "Bonjour Sophie, comment allez-vous aujourd'hui ?",
    timestamp: "10:15",
  },
  {
    id: 2,
    sender: "patient",
    content: "Bonjour Docteur, je vais mieux merci. La fièvre a baissé depuis hier.",
    timestamp: "10:17",
  },
  {
    id: 3,
    sender: "doctor",
    content:
      "C'est une excellente nouvelle. Continuez à prendre les médicaments comme prescrit pendant encore 3 jours. Avez-vous d'autres symptômes ?",
    timestamp: "10:19",
  },
  {
    id: 4,
    sender: "patient",
    content: "Non, juste un peu de fatigue mais rien de grave.",
    timestamp: "10:20",
  },
  {
    id: 5,
    sender: "doctor",
    content:
      "La fatigue est normale pendant la récupération. Assurez-vous de bien vous hydrater et de vous reposer suffisamment.",
    timestamp: "10:22",
  },
  {
    id: 6,
    sender: "patient",
    content: "Merci docteur, à bientôt !",
    timestamp: "10:23",
  },
]

// Mock files shared with the patient
const sharedFiles = [
  {
    id: 1,
    name: "Prescription_Sophie_Martin.pdf",
    date: "12/04/2023",
    size: "245 KB",
    type: "pdf",
  },
  {
    id: 2,
    name: "Resultats_Analyses_Sang.pdf",
    date: "10/04/2023",
    size: "1.2 MB",
    type: "pdf",
  },
  {
    id: 3,
    name: "Recommandations_Post_Consultation.docx",
    date: "12/04/2023",
    size: "78 KB",
    type: "docx",
  },
]

export default function DoctorChatPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [messageInput, setMessageInput] = useState("")
  const [activeTab, setActiveTab] = useState("chat")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // In a real app, this would send the message to the backend
    console.log("Sending message:", messageInput)

    // Clear input after sending
    setMessageInput("")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userType="doctor" />

      <div className="flex-1 ml-[70px] md:ml-64">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Messagerie</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-150px)]">
            {/* Patients list */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Rechercher un patient..." className="pl-10" />
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="divide-y">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        selectedPatient.id === patient.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={patient.image || "/placeholder.svg"} alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {patient.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{patient.name}</h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{patient.time}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{patient.lastMessage}</p>
                        </div>

                        {patient.unread > 0 && (
                          <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
                            {patient.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat area */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedPatient.image || "/placeholder.svg"} alt={selectedPatient.name} />
                    <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedPatient.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedPatient.online ? <span className="text-green-500">En ligne</span> : "Hors ligne"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat content */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-4 pt-2 border-b">
                  <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                    <TabsTrigger value="chat">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </TabsTrigger>
                    <TabsTrigger value="files">
                      <FileText className="h-4 w-4 mr-2" />
                      Fichiers
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
                  <ScrollArea className="flex-1">
                    <ChatBox messages={chatMessages} />
                  </ScrollArea>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t">
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Écrivez votre message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="files" className="flex-1 p-4 overflow-auto">
                  {sharedFiles.length > 0 ? (
                    <div className="space-y-3">
                      {sharedFiles.map((file) => (
                        <div key={file.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{file.name}</h4>
                            <p className="text-xs text-gray-500">
                              {file.date} • {file.size}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Télécharger
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <FileText className="h-12 w-12 text-gray-300 mb-2" />
                      <h3 className="font-medium text-gray-700">Aucun fichier partagé</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Les fichiers partagés avec ce patient apparaîtront ici
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
