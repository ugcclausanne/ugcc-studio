import React from 'react'
import {Card, Heading, Stack, Grid, Button} from '@sanity/ui'
import {useCurrentUser} from 'sanity'

function LinkButton({href, children, tone}) {
  return (
    <a href={href} className={tone === 'danger' ? 'site-danger' : 'site-primary'} style={{textDecoration: 'none'}}>
      <Button text={children} padding={3} mode="bleed" />
    </a>
  )
}

function CategoryCard({title, viewHref, addHref}) {
  return (
    <Card padding={4} radius={2} shadow={1} className="site-card">
      <Heading size={1} style={{marginBottom: 12}}>{title}</Heading>
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

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={1}>Розділи</Heading>
        <Grid columns={[1, 3]} gap={3}>
          <CategoryCard
            title="Новини"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='news'"
            addHref="?intent=create&type=article&template=article-news"
          />
          <CategoryCard
            title="Духовне"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='spiritual'"
            addHref="?intent=create&type=article&template=article-spiritual"
          />
          <CategoryCard
            title="Громадське"
            viewHref="?tool=desk&schemaType=article&filter=_type=='article'&&category=='community'"
            addHref="?intent=create&type=article&template=article-community"
          />
        </Grid>
        <Grid columns={[1, 2]} gap={3}>
          <CategoryCard
            title="Літургії"
            viewHref="?tool=desk&schemaType=schedule&filter=_type=='schedule'&&category=='liturgy'"
            addHref="?intent=create&type=schedule&template=schedule-liturgy"
          />
          <CategoryCard
            title="Оголошення"
            viewHref="?tool=desk&schemaType=schedule&filter=_type=='schedule'&&category=='announcement'"
            addHref="?intent=create&type=schedule&template=schedule-announcement"
          />
        </Grid>
      </Stack>
    </Card>
  )
}

