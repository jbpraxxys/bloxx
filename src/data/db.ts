import Dexie, { type Table } from 'dexie'
import type { BloxxProject, BlockDefinition } from '../types'

export class BloxxDB extends Dexie {
  projects!: Table<BloxxProject, string>
  customBlocks!: Table<BlockDefinition, string>

  constructor() {
    super('bloxx')
    this.version(1).stores({
      projects: 'id, name, updatedAt',
      customBlocks: 'id, category, name',
    })
  }
}

export const db = new BloxxDB()
