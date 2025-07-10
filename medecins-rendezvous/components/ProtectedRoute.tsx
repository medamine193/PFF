"use client"

import React, { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

type Props = {
  allowedRoles: string[]  // e.g. ["admin"], ["patient"], ["doctor"]
  children: ReactNode
}

type JwtPayload = {
  role?: string // adjust if your token uses another key for role
  exp?: number
  // any other fields you expect
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token)
      
      // Check expiration (optional)
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem("token")
        router.replace("/login")
        return
      }

      // Check role
      if (!decoded.role || !allowedRoles.includes(decoded.role)) {
        router.replace("/login")
        return
      }

      setAuthorized(true)
    } catch (err) {
      console.error("Invalid token", err)
      localStorage.removeItem("token")
      router.replace("/login")
    }
  }, [router, allowedRoles])

  if (authorized === null) {
    // Loading or redirecting
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Vérification en cours...
      </div>
    )
  }

  return <>{children}</>
}
