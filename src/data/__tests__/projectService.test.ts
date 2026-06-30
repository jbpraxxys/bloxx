import { describe, it, expect, beforeEach } from 'vitest'
import { projectService } from '../projectService'
import { db } from '../db'

describe('projectService', () => {
  beforeEach(async () => {
    await db.projects.clear()
  })

  it('creates a project with given name', async () => {
    const project = await projectService.create('Test Project')
    expect(project.name).toBe('Test Project')
    expect(project.pages).toHaveLength(1)
    expect(project.pages[0].name).toBe('Page 1')
  })

  it('retrieves all projects ordered by updatedAt', async () => {
    await projectService.create('First')
    await projectService.create('Second')
    const all = await projectService.getAll()
    expect(all).toHaveLength(2)
  })

  it('saves and updates a project', async () => {
    const project = await projectService.create('Test')
    project.name = 'Updated'
    await projectService.save(project)
    const updated = await projectService.getById(project.id)
    expect(updated?.name).toBe('Updated')
    expect(updated?.version).toBe(2)
  })

  it('deletes a project', async () => {
    const project = await projectService.create('Delete Me')
    await projectService.delete(project.id)
    const found = await projectService.getById(project.id)
    expect(found).toBeUndefined()
  })
})
