import React from 'react'
import {Box, Card, Heading, Stack, Text} from '@sanity/ui'

export default function HelpPane() {
  return (
    <Box padding={4}>
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={1}>Як працювати редактору</Heading>
          <Text>Статті: у підрозділах є фільтри — Усі, Новини, Духовність, Спільнота.</Text>
          <Text>Розклад: Усі події, Літургії та Оголошення — окремими списками.</Text>
          <Text>В кожному документі є вкладка “Превʼю”. Якщо адреса превʼю не задана — скажу як увімкнути.</Text>
          <Text muted size={1}>Порада: почніть з Dashboard — там є кнопки “Нова стаття/Нова подія”.</Text>
        </Stack>
      </Card>
    </Box>
  )
}

