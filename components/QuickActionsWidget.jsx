import React from 'react'
import {Card, Grid, Button, Heading, Stack, Box, Text} from '@sanity/ui'
import {useCurrentUser} from 'sanity'

function IntentLink({href, children}) {
  return (
    <a href={href} style={{textDecoration: 'none'}}>
      {children}
    </a>
  )
}

export default function QuickActionsWidget() {
  const {value: user} = useCurrentUser()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')
  if (isAdmin) return null
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={1}>Швидкі дії</Heading>
        <Grid columns={[1, 2, 3]} gap={3}>
          <IntentLink href="intent/create/type=article">
            <Button mode="contained" tone="primary" text="Нова стаття" style={{width: '100%'}} />
          </IntentLink>
          <IntentLink href="intent/create/type=schedule">
            <Button mode="contained" tone="primary" text="Нова подія" style={{width: '100%'}} />
          </IntentLink>

          <IntentLink href="?tool=desk">
            <Button text="Всі статті" style={{width: '100%'}} />
          </IntentLink>
          <IntentLink href="?tool=desk">
            <Button text="Весь розклад" style={{width: '100%'}} />
          </IntentLink>
          <Box />
        </Grid>
        <Text size={1} muted>
          Підказка: можна відкрити “Структура” зліва, щоб швидко перейти у потрібний розділ.
        </Text>
      </Stack>
    </Card>
  )
}
