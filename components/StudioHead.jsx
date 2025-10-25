import React from 'react'

export default function StudioHead() {
  return (
    <>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/site-vars.css" />
      <link rel="stylesheet" href="/site-navbar.css" />
      <style>{`
        .site-primary button{background:var(--burgundy)!important;color:var(--white)!important;border-radius:6px}
        .site-primary button:hover{background:var(--gold)!important}
        .site-danger button{background:#b73737!important;color:#fff!important;border-radius:6px}
        .site-danger button:hover{background:#a22f2f!important}
        .site-card{border:1px solid var(--border);}
      `}</style>
    </>
  )
}
