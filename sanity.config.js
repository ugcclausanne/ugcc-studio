import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {dashboardTool} from '@sanity/dashboard'
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
        {name: 'latest-news', component: LatestNewsWidget, layout: {width: 'medium'}},
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Keep only essential tools for editors
  tools: (prev) => prev.filter((tool) => ['desk', 'dashboard'].includes(tool.name)),

  // Simplify document actions for non‑technical editors
  document: {
    actions: (prev, context) =>
      prev.filter(({action}) => ['publish', 'unpublish', 'discardChanges', 'delete'].includes(action)),
  },
})
