import { describe, it, expect, beforeEach } from 'vitest'
import type { UndoAction } from '../../types'
import { undoRedo } from '../undo-redo'

describe('undoRedo', () => {
  beforeEach(() => {
    undoRedo.clear()
  })

  it('executes and undoes an action', () => {
    let value = 0

    let decrementAction: UndoAction
    const incrementAction: UndoAction = {
      type: 'INCREMENT',
      payload: {},
      inverse: () => decrementAction,
      execute: () => { value += 1 },
    }
    decrementAction = {
      type: 'DECREMENT',
      payload: {},
      inverse: () => incrementAction,
      execute: () => { value -= 1 },
    }

    undoRedo.execute(incrementAction)
    expect(value).toBe(1)
    expect(undoRedo.canUndo).toBe(true)

    undoRedo.undo()
    expect(value).toBe(0)
    expect(undoRedo.canRedo).toBe(true)
  })

  it('redoes an undone action', () => {
    let value = 0

    let decrementAction: UndoAction
    const incrementAction: UndoAction = {
      type: 'INCREMENT',
      payload: {},
      inverse: () => decrementAction,
      execute: () => { value += 1 },
    }
    decrementAction = {
      type: 'DECREMENT',
      payload: {},
      inverse: () => incrementAction,
      execute: () => { value -= 1 },
    }

    undoRedo.execute(incrementAction)
    undoRedo.undo()
    undoRedo.redo()
    expect(value).toBe(1)
  })

  it('clears redo stack on new execute', () => {
    let value = 0

    let decrementAction: UndoAction
    const incrementAction: UndoAction = {
      type: 'INCREMENT',
      payload: {},
      inverse: () => decrementAction,
      execute: () => { value += 1 },
    }
    decrementAction = {
      type: 'DECREMENT',
      payload: {},
      inverse: () => incrementAction,
      execute: () => { value -= 1 },
    }

    undoRedo.execute(incrementAction)
    undoRedo.undo()
    undoRedo.execute(incrementAction)
    expect(undoRedo.canRedo).toBe(false)
  })

  it('respects max stack size', () => {
    for (let i = 0; i < 60; i++) {
      const noopAction: UndoAction = {
        type: 'NOOP',
        payload: {},
        inverse: () => noopAction,
        execute: () => {},
      }
      undoRedo.execute(noopAction)
    }
    let undos = 0
    while (undoRedo.undo()) { undos++ }
    expect(undos).toBe(50)
  })
})