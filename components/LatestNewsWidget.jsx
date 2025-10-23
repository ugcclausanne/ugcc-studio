import React, {useEffect, useState} from 'react'
import {Box, Card, Heading, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'

export default function LatestNewsWidget() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      setLoading(true)
      try {
        const data = await client.fetch(
          '*[_type == "article" && category == "news"] | order(_createdAt desc)[0...8]{_id, title, language, _createdAt}'
        )
        if (!cancelled) setItems(data)
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [client])

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={3}>
        <Heading size={1}>Останні новини</Heading>
        {loading && <Text>Завантаження…</Text>}
        {error && <Text tone="critical">Помилка завантаження</Text>}
        {!loading && !error && items.length === 0 && <Text>Немає новин</Text>}
        {!loading && !error && items.length > 0 && (
          <Box>
            <ul style={{margin: 0, paddingLeft: '1.25rem'}}>
              {items.map((it) => (
                <li key={it._id} style={{marginBottom: '0.25rem'}}>
                  <a href={`intent/edit/id=${encodeURIComponent(it._id)}`}>
                    {it.title || '(без назви)'} {it.language ? `· ${it.language}` : ''}
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Stack>
    </Card>
  )
}

