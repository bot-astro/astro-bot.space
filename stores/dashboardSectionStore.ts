import { defineStore } from 'pinia'
import { DashboardSection } from '~/types/dashboard/DashboardSection'

interface DashboardSectionState {
  selectedSection: DashboardSection
  // TODO: Selected generator, interface, etc... info
}

export const useDashboardSectionStore = defineStore({
  id: 'dashboardSectionsStore',
  state: (): DashboardSectionState => ({
    selectedSection: DashboardSection.OVERVIEW,
  }),
  actions: {
    selectSection(section: DashboardSection) {
      this.selectedSection = section
    },
  },
})
