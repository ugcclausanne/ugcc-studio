import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {dashboardTool, projectInfoWidget, projectUsersWidget, documentListWidget} from '@sanity/dashboard'
import {createTheme, studioTheme} from '@sanity/ui'

export default defineConfig({
  name: 'default',
  title: 'UGCC Lausanne',

  projectId: 'y4j9iov2',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    dashboardTool({
      widgets: [
        projectInfoWidget({
          data: [
            {title: 'Сайт', value: 'https://ugcclausanne.github.io/ugcc-site/'},
            {title: 'GitHub', value: 'https://github.com/ugcclausanne/ugcc-site'},
          ],
        }),
        projectUsersWidget(),
        documentListWidget({
          title: 'Останні новини',
          query: '*[_type == "article" && category == "news"] | order(_createdAt desc)[0...8]',
          layout: {width: 'medium'},
        }),
      ],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Force light theme for editors
  theme: createTheme(studioTheme, {color: {dark: false}}),
})

