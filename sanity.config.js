import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import LatestNewsWidget from './components/LatestNewsWidget'
import QuickActionsWidget from './components/QuickActionsWidget'
import CountsWidget from './components/CountsWidget'

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
        {name: 'quick-actions', component: QuickActionsWidget, layout: {width: 'full'}},
        {name: 'counts', component: CountsWidget, layout: {width: 'full'}},
        projectInfoWidget({
          data: [
            {title: 'Сайт', value: 'https://ugcclausanne.github.io/ugcc-site/'},
            {title: 'GitHub', value: 'https://github.com/ugcclausanne/ugcc-site'},
          ],
        }),
        projectUsersWidget(),
        {name: 'latest-news', component: LatestNewsWidget, layout: {width: 'medium'}},
      ],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

