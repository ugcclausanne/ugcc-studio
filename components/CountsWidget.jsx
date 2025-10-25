import React, {useEffect, useState} from 'react'
import {Card, Heading, Stack, Grid, Text, Box} from '@sanity/ui'
import {useClient, useCurrentUser} from 'sanity'

export default function CountsWidget() {
  const {value: user} = useCurrentUser()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')
  if (isAdmin) return null

  const client = useClient({apiVersion: '2024-01-01'})
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const q = `{
          articleTotal: count(*[_type=="article"]),
          news: count(*[_type=="article" && category=="news"]),
          spiritual: count(*[_type=="article" && category=="spiritual"]),
          community: count(*[_type=="article" && category=="community"]),
          scheduleTotal: count(*[_type=="schedule"]),
          liturgies: count(*[_type=="schedule" && category=="liturgy"]),
          announcements: count(*[_type=="schedule" && category=="announcement"])
        }`
        const res = await client.fetch(q)
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) setData({})
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [client])

  const Stat = ({label, value}) => (
    <Box>
      <Text size={2} weight="semibold">{label}</Text>
      <Heading size={2}>{value ?? '—'}</Heading>
    </Box>
  )

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={3}>
        <Heading size={1}>Зведення</Heading>
        {loading && <Text>Завантаження…</Text>}
        {!loading && (
          <Grid columns={[2, 3, 3]} gap={4}>
            <Stat label="Статті" value={data?.articleTotal} />
            <Stat label="Новини" value={data?.news} />
            <Stat label="Духовність" value={data?.spiritual} />
            <Stat label="Спільнота" value={data?.community} />
            <Stat label="Події" value={data?.scheduleTotal} />
            <Stat label="Літургії" value={data?.liturgies} />
            <Stat label="Оголошення" value={data?.announcements} />
          </Grid>
        )}
      </Stack>
    </Card>
  )
}

