import { create } from 'zustand'
import type { BloxxProject, BloxxPage, BlockInstance, StyleOverride } from '../types'
import { projectService } from '../data/projectService'

interface ProjectState {
  project: BloxxProject | null
  projects: BloxxProject[]
  isLoading: boolean

  loadProjects: () => Promise<void>
  loadProject: (id: string) => Promise<void>
  createProject: (name: string) => Promise<BloxxProject>
  saveProject: () => Promise<void>
  deleteProject: (id: string) => Promise<void>

  // Page operations
  addPage: (name: string) => void
  removePage: (pageId: string) => void

  // Block operations
  addBlock: (pageId: string, blockId: string, variantId: string) => void
  removeBlock: (pageId: string, blockInstanceId: string) => void
  moveBlock: (pageId: string, fromIndex: number, toIndex: number) => void
  updateBlockContent: (pageId: string, blockInstanceId: string, content: Record<string, any>) => void
  updateBlockVariant: (pageId: string, blockInstanceId: string, variantId: string) => void
  updateBlockOverrides: (pageId: string, blockInstanceId: string, overrides: StyleOverride[]) => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: null,
  projects: [],
  isLoading: false,

  loadProjects: async () => {
    const projects = await projectService.getAll()
    set({ projects })
  },

  loadProject: async (id: string) => {
    const project = await projectService.getById(id)
    if (project) set({ project })
  },

  createProject: async (name: string) => {
    const project = await projectService.create(name)
    set({ project })
    return project
  },

  saveProject: async () => {
    const { project } = get()
    if (project) await projectService.save(project)
  },

  deleteProject: async (id: string) => {
    await projectService.delete(id)
    const { project } = get()
    if (project?.id === id) set({ project: null })
    get().loadProjects()
  },

  addPage: (name: string) => {
    const { project, saveProject } = get()
    if (!project) return
    const newPage: BloxxPage = {
      id: crypto.randomUUID(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      blocks: [],
    }
    project.pages.push(newPage)
    saveProject()
  },

  removePage: (pageId: string) => {
    const { project, saveProject } = get()
    if (!project) return
    project.pages = project.pages.filter((p) => p.id !== pageId)
    saveProject()
  },

  addBlock: (pageId: string, blockId: string, variantId: string) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const newBlock: BlockInstance = {
      id: crypto.randomUUID(),
      blockId,
      variantId,
      content: {},
      overrides: [],
    }
    page.blocks.push(newBlock)
    saveProject()
  },

  removeBlock: (pageId: string, blockInstanceId: string) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    page.blocks = page.blocks.filter((b) => b.id !== blockInstanceId)
    saveProject()
  },

  moveBlock: (pageId: string, fromIndex: number, toIndex: number) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const [block] = page.blocks.splice(fromIndex, 1)
    page.blocks.splice(toIndex, 0, block)
    saveProject()
  },

  updateBlockContent: (pageId: string, blockInstanceId: string, content: Record<string, any>) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const block = page.blocks.find((b) => b.id === blockInstanceId)
    if (!block) return
    Object.assign(block.content, content)
    saveProject()
  },

  updateBlockVariant: (pageId: string, blockInstanceId: string, variantId: string) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const block = page.blocks.find((b) => b.id === blockInstanceId)
    if (!block) return
    block.variantId = variantId
    saveProject()
  },

  updateBlockOverrides: (pageId: string, blockInstanceId: string, overrides: StyleOverride[]) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const block = page.blocks.find((b) => b.id === blockInstanceId)
    if (!block) return
    block.overrides = overrides
    saveProject()
  },
}))
