import React, {useMemo} from 'react'
import {Box, Text} from '@sanity/ui'

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
        <Text>
          РќРµ Р·Р°РґР°РЅРѕ Р°РґСЂРµСЃРё РїСЂРµРІКјСЋ. Р”РѕРґР°Р№С‚Рµ Р·РјС–РЅРЅСѓ СЃРµСЂРµРґРѕРІРёС‰Р° SANITY_STUDIO_PREVIEW_URL
          (РЅР°РїСЂРёРєР»Р°Рґ, https://ugcc-site.local/preview) С– РїРµСЂРµР·Р°РїСѓСЃС‚С–С‚СЊ Studio.
        </Text>
      </Box>
    )
  }

  return (
    <Box style={{height: '100%', width: '100%'}}>      
      <iframe
        title="РџСЂРµРІКјСЋ"
        src={url}
        style={{border: 0, width: '100%', height: '100%'}}
      />
    </Box>
  )
}


