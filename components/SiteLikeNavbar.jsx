import React from "react"
import {Button, Card, Flex, Text} from "@sanity/ui"
import {useCurrentUser} from "sanity"

export default function SiteLikeNavbar() {
  const {value: user} = useCurrentUser()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')

  const NavButton = ({href, text}) => (
    <a href={href} style={{textDecoration: 'none'}}>
      <Button mode="bleed" text={text} padding={3} />
    </a>
  )

  return (
    <Card padding={0} shadow={1} className="site-navbar" style={{position:'sticky',top:0,zIndex:10}}>
      <Flex align="center" justify="space-between" padding={3} style={{gap:8}}>
        <Flex align="center" style={{gap:12}} className="brand">
          <img src="/logo.png" alt="UGCC Lausanne" style={{height:28,width:'auto'}} />
          <Text weight="semibold">UGCC Lausanne — Адмінка</Text>
        </Flex>
        <Flex align="center" style={{gap:8}} className="navlinks">
          {!isAdmin && (
            <a href="?intent=create&type=article" style={{textDecoration:'none'}}>
              <Button text="Нова стаття" padding={3} className="site-primary" />
            </a>
          )}
          {!isAdmin && (
            <a href="?intent=create&type=schedule" style={{textDecoration:'none'}}>
              <Button text="Нова подія" padding={3} className="site-primary" />
            </a>
          )}
          <NavButton href="?tool=dashboard" text="Дашборд" />
          <NavButton href="?tool=desk&schemaType=article" text="Статті" />
          <NavButton href="?tool=desk&schemaType=schedule" text="Розклад" />
          <a href="https://ugcclausanne.github.io/ugcc-site/" target="_blank" rel="noreferrer" style={{textDecoration:'none'}} className="site-primary">
            <Button text="На сайт" padding={3} />
          </a>
        </Flex>
      </Flex>
    </Card>
  )
}
