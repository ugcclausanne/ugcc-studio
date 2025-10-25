import React from 'react'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'

export default function SiteLikeNavbar(props) {
  const NavButton = ({href, text}) => (
    <a href={href} style={{textDecoration: 'none'}}>
      <Button mode="bleed" text={text} padding={3} />
    </a>
  )

  return (
    <Card padding={0} shadow={1} style={{position: 'sticky', top: 0, zIndex: 10}}>
      <Flex align="center" justify="space-between" padding={3} style={{gap: 8}}>
        <Flex align="center" style={{gap: 12}}>
          <img src="/logo.png" alt="UGCC Lausanne" style={{height: 28, width: 'auto'}} />
          <Text weight="semibold">UGCC Lausanne — Адмінка</Text>
        </Flex>
        <Flex align="center" style={{gap: 8}}>
          <NavButton href="?tool=dashboard" text="Дашборд" />
          <NavButton href="?tool=desk&schemaType=article" text="Статті" />
          <NavButton href="?tool=desk&schemaType=schedule" text="Розклад" />
          <a href="https://ugcclausanne.github.io/ugcc-site/" target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
            <Button text="На сайт" tone="primary" padding={3} />
          </a>
        </Flex>
      </Flex>
    </Card>
  )
}

