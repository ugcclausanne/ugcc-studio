import React, {useEffect, useState} from 'react'
import {Card, Heading, Stack, Grid, Button, Text} from '@sanity/ui'
import {useCurrentUser, useClient} from 'sanity'

function LinkButton({href, children, tone}) {
  return (
    <a href={href} className={tone === 'danger' ? 'site-danger' : 'site-primary'} style={{textDecoration: 'none'}}>
      <Button text={children} padding={3} mode="bleed" />
    </a>
  )
}

function CategoryCard({title, viewHref, addHref, count}) {
  return (
    <Card padding={4} radius={2} shadow={1} className="site-card">
      <Heading size={1} style={{marginBottom: 4}}>{title}</Heading>
      <Text size={1} muted style={{marginBottom: 12}}>
        {typeof count === 'number' ? `${count} матеріалів` : '—'}
      </Text>
      <Grid columns={[2]} gap={2}>
        <LinkButton href={viewHref}>Переглянути</LinkButton>
        <LinkButton href={addHref}>Додати</LinkButton>
      </Grid>
    </Card>
  )
}

export default function DashboardCategories() {
  const {value: user} = useCurrentUser()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'administrator')
  if (isAdmin) return null
  const client = useClient({apiVersion: '2024-01-01'})
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const q = `{
          news: count(*[_type=="article" && category=="news"]),
          spiritual: count(*[_type=="article" && category=="spiritual"]),
          community: count(*[_type=="article" && category=="community"]),
          liturgy: count(*[_type=="schedule" && category=="liturgy"]),
          announcement: count(*[_type=="schedule" && category=="announcement"])
        }`
        const data = await client.fetch(q)
        if (!cancelled) setCounts(data)
      } catch (_e) {
        if (!cancelled) setCounts({})
      }
    }
    run()
    return () => { cancelled = true }
  }, [client])

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={1}>Розділи</Heading>
        <Grid columns={[1, 3]} gap={3}>
          <CategoryCard
            title="Новини"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='news'"
            addHref="?intent=create&type=article&template=article-news"
            count={counts?.news}
          />
          <CategoryCard
            title="Духовне"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='spiritual'"
            addHref="?intent=create&type=article&template=article-spiritual"
            count={counts?.spiritual}
          />
          <CategoryCard
            title="Громадське"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='community'"
            addHref="?intent=create&type=article&template=article-community"
            count={counts?.community}
          />
        </Grid>
        <Grid columns={[1, 2]} gap={3}>
          <CategoryCard
            title="Літургії"
            viewHref="?tool=desk&schemaType=schedule&filter=_type=='schedule'&&category=='liturgy'"
            addHref="?intent=create&type=schedule&template=schedule-liturgy"
            count={counts?.liturgy}
          />
          <CategoryCard
            title="Оголошення"
            viewHref="?tool=desk&schemaType=schedule&filter=_type=='schedule'&&category=='announcement'"
            addHref="?intent=create&type=schedule&template=schedule-announcement"
            count={counts?.announcement}
          />
        </Grid>
      </Stack>
    </Card>
  )
}
