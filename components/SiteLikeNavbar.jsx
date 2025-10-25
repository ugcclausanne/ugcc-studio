import React from 'react'
import {Button, Card, Flex, Text} from '@sanity/ui'
import {useCurrentUser} from 'sanity'

export default function SiteLikeNavbar() {
  const {value: user} = useCurrentUser()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')
  if (isAdmin) return null

  return (
    <Card padding={0} shadow={1} style={{position: 'sticky', top: 0, zIndex: 10}}>
      <Flex align="center" justify="space-between" padding={3} style={{gap: 8}}>
        <Flex align="center" style={{gap: 12}}>
          <img src="/logo.png" alt="UGCC Lausanne" style={{height: 28, width: 'auto'}} />
          <Text weight="semibold">UGCC Lausanne — Адмінка</Text>
        </Flex>
        <Flex align="center" style={{gap: 8}}>
          <a href="?tool=dashboard" style={{textDecoration: 'none'}}>
            <Button mode="bleed" text="Дашборд" padding={3} />
          </a>
          <a href="https://ugcclausanne.github.io/ugcc-site/" target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
            <Button text="На сайт" padding={3} />
          </a>
        </Flex>
      </Flex>
    </Card>
  )
}

