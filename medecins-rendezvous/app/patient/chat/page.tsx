"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Paperclip, Send } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import ChatBox from "@/components/ChatBox"
import ProtectedRoute from "@/components/ProtectedRoute"


// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    doctor: {
      id: 1,
      name: "Dr. Sophie Martin",
      specialization: "Médecine générale",
      image: "/placeholder.svg?height=100&width=100",
      lastSeen: "En ligne",
    },
    lastMessage: "Bonjour, comment puis-je vous aider aujourd'hui ?",
    timestamp: "10:30",
    unread: 1,
  },
  {
    id: 2,
    doctor: {
      id: 2,
      name: "Dr. Thomas Dubois",
      specialization: "Cardiologie",
      image: "/placeholder.svg?height=100&width=100",
      lastSeen: "Il y a 30 min",
    },
    lastMessage: "N'oubliez pas de prendre votre tension artérielle régulièrement.",
    timestamp: "Hier",
    unread: 0,
  },
  {
    id: 3,
    doctor: {
      id: 3,
      name: "Dr. Emma Bernard",
      specialization: "Dermatologie",
      image: "/placeholder.svg?height=100&width=100",
      lastSeen: "Il y a 2h",
    },
    lastMessage: "Voici l'ordonnance pour votre traitement.",
    timestamp: "Lun",
    unread: 0,
  },
]

// Mock messages for the first conversation
const mockMessages = [
  {
    id: 1,
    sender: "doctor",
    content: "Bonjour, comment puis-je vous aider aujourd'hui ?",
    timestamp: "10:30",
  },
  {
    id: 2,
    sender: "patient",
    content: "Bonjour Docteur, j'ai des questions concernant mon traitement.",
    timestamp: "10:32",
  },
  {
    id: 3,
    sender: "doctor",
    content: "Bien sûr, je suis là pour ça. Quelles sont vos questions ?",
    timestamp: "10:33",
  },
  {
    id: 4,
    sender: "patient",
    content: "Je ressens des effets secondaires comme des maux de tête et des vertiges. Est-ce normal ?",
    timestamp: "10:35",
  },
  {
    id: 5,
    sender: "doctor",
    content:
      "Ces symptômes peuvent effectivement être des effets secondaires du traitement. Depuis combien de temps les ressentez-vous ? Sont-ils constants ou occasionnels ?",
    timestamp: "10:38",
  },
  {
    id: 6,
    sender: "patient",
    content:
      "Depuis environ 3 jours. Les maux de tête sont presque constants, mais les vertiges sont occasionnels, surtout quand je me lève rapidement.",
    timestamp: "10:40",
  },
  {
    id: 7,
    sender: "doctor",
    content:
      "Je comprends. Dans ce cas, je vous recommande de réduire légèrement la dose pendant quelques jours. Prenez 5ml au lieu de 10ml et voyez si les symptômes s'améliorent. Si les vertiges persistent ou s'aggravent, contactez-moi immédiatement ou consultez aux urgences.",
    timestamp: "10:45",
  },
  {
    id: 8,
    sender: "patient",
    content: "D'accord, je vais essayer ça. Merci beaucoup pour votre aide, Docteur.",
    timestamp: "10:47",
  },
  {
    id: 9,
    sender: "doctor",
    content: "Je vous en prie. N'hésitez pas à me tenir informée de l'évolution de vos symptômes. Prenez soin de vous.",
    timestamp: "10:48",
  },
]

export default function PatientChatPage() {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("chat")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      sender: "patient",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate doctor response after a delay
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "doctor",
        content:
          "Je vous remercie pour ces informations. Je vais les examiner et vous répondre dans les plus brefs délais.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, response])
    }, 3000)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="patient" />

      <div className="flex-1">
        <div className="h-screen flex flex-col">
          <div className="flex-1 flex">
            {/* Conversations list */}
            <div className="w-80 border-r bg-white">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Messages</h2>
              </div>

              <div className="overflow-y-auto h-full">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                      activeConversation.id === conversation.id ? "bg-slate-50" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={conversation.doctor.image || "/placeholder.svg?height=48&width=48"}
                            alt={conversation.doctor.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{conversation.doctor.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">{conversation.doctor.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b bg-white flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={activeConversation.doctor.image || "/placeholder.svg?height=40&width=40"}
                    alt={activeConversation.doctor.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{activeConversation.doctor.name}</h3>
                  <p className="text-xs text-muted-foreground">{activeConversation.doctor.lastSeen}</p>
                </div>
                <div className="ml-auto">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="files">Fichiers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="hidden">
                      {/* This content is hidden because we're using the tab value to control what's shown below */}
                    </TabsContent>
                    <TabsContent value="files" className="hidden">
                      {/* This content is hidden because we're using the tab value to control what's shown below */}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Messages or Files based on active tab */}
              {activeTab === "chat" ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
                    <ChatBox messages={messages} />
                  </div>

                  {/* Message input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-2">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Input
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleSendMessage}
                        disabled={newMessage.trim() === ""}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">Fichiers partagés</h3>
                    <p className="text-muted-foreground">Aucun fichier n'a été partagé dans cette conversation.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
