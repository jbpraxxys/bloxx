import { create } from 'zustand'
import type { ViewportDevice, EditorMode } from '../types'

interface CanvasState {
  viewport: ViewportDevice
  editorMode: EditorMode
  canvasMode: 'stack' | 'freeform'
  selectedBlockIndex: number | null
  selectedElementRole: string | null

  setViewport: (device: ViewportDevice) => void
  setEditorMode: (mode: EditorMode) => void
  setCanvasMode: (mode: 'stack' | 'freeform') => void
  selectElement: (blockIndex: number | null, role?: string) => void
  clearSelection: () => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  viewport: 'desktop',
  editorMode: 'edit',
  canvasMode: 'stack',
  selectedBlockIndex: null,
  selectedElementRole: null,

  setViewport: (device: ViewportDevice) => set({ viewport: device }),
  setEditorMode: (mode: EditorMode) => set({ editorMode: mode }),
  setCanvasMode: (mode) => set({ canvasMode: mode }),
  selectElement: (blockIndex, role) =>
    set({ selectedBlockIndex: blockIndex, selectedElementRole: role ?? null }),
  clearSelection: () =>
    set({ selectedBlockIndex: null, selectedElementRole: null }),
}))
