import React, {useMemo} from 'react'
import {Box, Text} from '@sanity/ui'

export default function PreviewPane(props) {
  const {documentId, schemaType} = props

  const baseUrl = import.meta.env.SANITY_STUDIO_PREVIEW_URL || ''
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
        <Text>
          Не задано адреси превʼю. Додайте змінну середовища SANITY_STUDIO_PREVIEW_URL
          (наприклад, https://ugcc-site.local/preview) і перезапустіть Studio.
        </Text>
      </Box>
    )
  }

  return (
    <Box style={{height: '100%', width: '100%'}}>      
      <iframe
        title="Превʼю"
        src={url}
        style={{border: 0, width: '100%', height: '100%'}}
      />
    </Box>
  )
}

