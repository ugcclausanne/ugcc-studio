import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {dashboardTool} from '@sanity/dashboard'
import LatestNewsWidget from './components/LatestNewsWidget'
import QuickActionsWidget from './components/QuickActionsWidget'
import CountsWidget from './components/CountsWidget'
import StudioHead from './components/StudioHead'
import SiteLikeNavbar from './components/SiteLikeNavbar'

export default defineConfig({
  name: 'default',
  title: 'UGCC Lausanne',

  projectId: 'y4j9iov2',
  dataset: 'production',

  plugins: [
    structureTool({structure: deskStructure}),
    dashboardTool({
      widgets: [
        {name: 'quick-actions', component: QuickActionsWidget, layout: {width: 'full'}},
        {name: 'counts', component: CountsWidget, layout: {width: 'full'}},
        {name: 'latest-news', component: LatestNewsWidget, layout: {width: 'medium'}},
      ],
    }),
    visionTool(),
  ],

  schema: {types: schemaTypes},

  studio: {
    components: {
      head: StudioHead,
      navbar: SiteLikeNavbar,
    },
  },

  // Editors: Desk + Dashboard; Admins: also Vision
  tools: (prev, {currentUser}) => {
    const isAdmin = !!currentUser?.roles?.some((r) => r.name === 'administrator')
    const allowed = ['desk', 'dashboard']
    if (isAdmin) allowed.push('vision')
    return prev.filter((tool) => allowed.includes(tool.name))
  },

  // Simplify actions only for non-admins
  document: {
    actions: (prev, {currentUser}) => {
      const isAdmin = !!currentUser?.roles?.some((r) => r.name === 'administrator')
      if (isAdmin) return prev
      return prev.filter(({action}) => ['publish', 'unpublish', 'discardChanges', 'delete'].includes(action))
    },
  },
})
