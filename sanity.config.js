import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {dashboardTool} from '@sanity/dashboard'
import LatestNewsWidget from './components/LatestNewsWidget'
import QuickActionsWidget from './components/QuickActionsWidget'
import CountsWidget from './components/CountsWidget'
import DashboardCategories from './components/DashboardCategories'
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
        {name: 'categories', component: DashboardCategories, layout: {width: 'full'}},
        {name: 'counts', component: CountsWidget, layout: {width: 'full'}},
      ],
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {id: 'article-news', title: 'РќРѕРІР° СЃС‚Р°С‚С‚СЏ вЂ” РќРѕРІРёРЅРё', schemaType: 'article', value: {category: 'news'}},
      {id: 'article-spiritual', title: 'РќРѕРІР° СЃС‚Р°С‚С‚СЏ вЂ” Р”СѓС…РѕРІРЅС–СЃС‚СЊ', schemaType: 'article', value: {category: 'spiritual'}},
      {id: 'article-community', title: 'РќРѕРІР° СЃС‚Р°С‚С‚СЏ вЂ” РЎРїС–Р»СЊРЅРѕС‚Р°', schemaType: 'article', value: {category: 'community'}},
      {id: 'schedule-liturgy', title: 'РќРѕРІР° РїРѕРґС–СЏ вЂ” Р›С–С‚СѓСЂРіС–СЏ', schemaType: 'schedule', value: {category: 'liturgy'}},
      {id: 'schedule-announcement', title: 'РќРѕРІР° РїРѕРґС–СЏ вЂ” РћРіРѕР»РѕС€РµРЅРЅСЏ', schemaType: 'schedule', value: {category: 'announcement'}},
    ],
  },

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

