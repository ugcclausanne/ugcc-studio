import React, {useMemo} from "react"
import {Box, Text, Button, Flex} from "@sanity/ui"

export default function PreviewPane(props) {
  const {documentId, schemaType} = props

  const baseUrl = (globalThis && globalThis.SANITY_STUDIO_PREVIEW_URL) || 'https://ugcclausanne.github.io/ugcc-site/preview/'
  const url = useMemo(() => {
    if (!baseUrl) return ''
    const u = new URL(baseUrl)
    u.searchParams.set('type', schemaType?.name || '')
    u.searchParams.set('id', documentId || '')
    return u.toString()
  }, [baseUrl, documentId, schemaType?.name])

  if (!baseUrl) {
    return (
      <Box padding={4}>
        <Text>Не задано адреси превʼю. Додайте SANITY_STUDIO_PREVIEW_URL і перезапустіть Studio.</Text>
      </Box>
    )
  }

  return (
    <Box style={{height:'100%',width:'100%'}}>
      <Flex padding={2} style={{gap:8,borderBottom:'1px solid var(--border, #e0e0e0)'}}>
        <a href={`?intent=create&type=${schemaType?.name || ''}`} className="site-primary" style={{textDecoration:'none'}}>
          <Button text="Додати" padding={2} />
        </a>
        {documentId && (
          <a href={`?intent=edit&id=${encodeURIComponent(documentId)}`} style={{textDecoration:'none'}}>
            <Button text="Змінити" padding={2} />
          </a>
        )}
        {documentId && (
          <a href={`?intent=edit&id=${encodeURIComponent(documentId)}#delete`} className="site-danger" style={{textDecoration:'none'}}>
            <Button text="Видалити" padding={2} />
          </a>
        )}
        <Box flex={1} />
        <Text size={1} muted>Превʼю сайту</Text>
      </Flex>
      <iframe title="Превʼю" src={url} style={{border:0,width:'100%',height:'calc(100% - 40px)'}} />
    </Box>
  )
}
