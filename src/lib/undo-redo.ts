import type { UndoAction } from '../types'

const MAX_STACK = 50

class UndoRedoManager {
  private undoStack: UndoAction[] = []
  private redoStack: UndoAction[] = []

  execute(action: UndoAction): void {
    action.execute()
    this.undoStack.push(action)
    if (this.undoStack.length > MAX_STACK) {
      this.undoStack.shift()
    }
    this.redoStack = []
  }

  undo(): boolean {
    const action = this.undoStack.pop()
    if (!action) return false
    const inverse = action.inverse()
    inverse.execute()
    this.redoStack.push(inverse)
    return true
  }

  redo(): boolean {
    const inverse = this.redoStack.pop()
    if (!inverse) return false
    const action = inverse.inverse()
    action.execute()
    this.undoStack.push(action)
    return true
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0
  }

  clear(): void {
    this.undoStack = []
    this.redoStack = []
  }
}

export const undoRedo = new UndoRedoManager()