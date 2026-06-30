import { db } from './db'
import type { BloxxProject, DesignTokens } from '../types'

const DEFAULT_DESIGN_TOKENS: DesignTokens = {
  colors: {},
  typography: {},
  spacing: {},
  borders: {},
  shadows: {},
}

export const projectService = {
  async create(name: string): Promise<BloxxProject> {
    const project: BloxxProject = {
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      pages: [
        {
          id: crypto.randomUUID(),
          name: 'Page 1',
          slug: 'index',
          blocks: [],
        },
      ],
      customBlocks: [],
      designTokens: DEFAULT_DESIGN_TOKENS,
      metadata: {
        canvasMode: 'stack',
        canvasWidth: 1440,
      },
    }
    await db.projects.add(project)
    return project
  },

  async getAll(): Promise<BloxxProject[]> {
    return db.projects.orderBy('updatedAt').reverse().toArray()
  },

  async getById(id: string): Promise<BloxxProject | undefined> {
    return db.projects.get(id)
  },

  async save(project: BloxxProject): Promise<void> {
    project.updatedAt = Date.now()
    project.version += 1
    await db.projects.put(project)
  },

  async delete(id: string): Promise<void> {
    await db.projects.delete(id)
  },
}
