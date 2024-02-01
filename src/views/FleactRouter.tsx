import { Router } from 'wouter'
import type { ReactNode } from 'react'

export default function FleactRouter({ children }: { children: ReactNode }) {
  const base = document.baseURI.replace(location.origin, '')

  return <Router base={base.substring(0, base.length - 1)}>{children}</Router>
}
