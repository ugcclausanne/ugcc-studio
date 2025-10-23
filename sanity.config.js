import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'UGCC Lausanne',

  projectId: 'y4j9iov2',
  dataset: 'production',

  plugins: [structureTool({ structure: () => import('./deskStructure').then(m => m.default()) }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

