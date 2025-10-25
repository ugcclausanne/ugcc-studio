import React from 'react'
import {useCurrentUser} from 'sanity'

export default function StudioHead() {
  const {value: user} = useCurrentUser?.() || {}
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')
  if (isAdmin) return null
  return null
}

