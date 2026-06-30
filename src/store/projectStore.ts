import { create } from 'zustand'
import type { UndoAction, BloxxProject, BloxxPage, BlockInstance, StyleOverride, BlockDefinition } from '../types'
import { projectService } from '../data/projectService'
import { undoRedo } from '../lib/undo-redo'

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
  updateBlockPosition: (pageId: string, blockInstanceId: string, position: { x: number; y: number; width: number; height: number }) => void

  // Custom block operations
  saveCustomBlock: (block: BlockDefinition) => void
  deleteCustomBlock: (blockId: string) => void
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
    if (project) set({ project: JSON.parse(JSON.stringify(project)) })
  },

  createProject: async (name: string) => {
    const project = await projectService.create(name)
    set({ project: JSON.parse(JSON.stringify(project)) })
    return project
  },

  saveProject: async () => {
    const { project } = get()
    if (project) {
      await projectService.save(project)
      set({ project: { ...project } }) // Force new reference for React
    }
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
    const { project } = get()
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

    let removeInverseAction: UndoAction
    const addAction: UndoAction = {
      type: 'ADD_BLOCK',
      payload: { pageId, blockId, variantId, instanceId: newBlock.id },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        p.blocks.push(newBlock)
        get().saveProject()
      },
      inverse: () => removeInverseAction,
    }
    removeInverseAction = {
      type: 'REMOVE_BLOCK',
      payload: { pageId, instanceId: newBlock.id },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        p.blocks = p.blocks.filter((b) => b.id !== newBlock.id)
        get().saveProject()
      },
      inverse: () => addAction,
    }

    undoRedo.execute(addAction)
  },

  removeBlock: (pageId: string, blockInstanceId: string) => {
    const { project } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const removedIndex = page.blocks.findIndex((b) => b.id === blockInstanceId)
    const removedBlock = page.blocks.find((b) => b.id === blockInstanceId)
    if (!removedBlock) return

    let addBlockAtAction: UndoAction
    const removeAction: UndoAction = {
      type: 'REMOVE_BLOCK',
      payload: { pageId, blockInstanceId, removedIndex, removedBlock },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        p.blocks = p.blocks.filter((b) => b.id !== blockInstanceId)
        get().saveProject()
      },
      inverse: () => addBlockAtAction,
    }
    addBlockAtAction = {
      type: 'ADD_BLOCK_AT',
      payload: { pageId, block: removedBlock, index: removedIndex },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        p.blocks.splice(removedIndex, 0, removedBlock)
        get().saveProject()
      },
      inverse: () => removeAction,
    }

    undoRedo.execute(removeAction)
  },

  moveBlock: (pageId: string, fromIndex: number, toIndex: number) => {
    const { project } = get()
    if (!project) return

    let reverseMoveAction: UndoAction
    const moveAction: UndoAction = {
      type: 'MOVE_BLOCK',
      payload: { pageId, fromIndex, toIndex },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        const [block] = p.blocks.splice(fromIndex, 1)
        p.blocks.splice(toIndex, 0, block)
        get().saveProject()
      },
      inverse: () => reverseMoveAction,
    }
    reverseMoveAction = {
      type: 'MOVE_BLOCK',
      payload: { pageId, fromIndex: toIndex, toIndex: fromIndex },
      execute: () => {
        const p = get().project?.pages.find((pg) => pg.id === pageId)
        if (!p) return
        const [block] = p.blocks.splice(toIndex, 1)
        p.blocks.splice(fromIndex, 0, block)
        get().saveProject()
      },
      inverse: () => moveAction,
    }

    undoRedo.execute(moveAction)
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

  updateBlockPosition: (pageId, blockInstanceId, position) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const block = page.blocks.find((b) => b.id === blockInstanceId)
    if (!block) return
    block.position = position
    saveProject()
  },

  saveCustomBlock: (block) => {
    const { project, saveProject } = get()
    if (!project) return
    const existing = project.customBlocks.findIndex((b) => b.id === block.id)
    if (existing >= 0) {
      project.customBlocks[existing] = block
    } else {
      project.customBlocks.push(block)
    }
    saveProject()
  },

  deleteCustomBlock: (blockId) => {
    const { project, saveProject } = get()
    if (!project) return
    project.customBlocks = project.customBlocks.filter((b) => b.id !== blockId)
    saveProject()
  },
}))