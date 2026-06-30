import React, { useState } from 'react'
import type { BlockDefinition, ContentSlot } from '../../types'
import { useProjectStore } from '../../store/projectStore'

interface BlockEditorProps {
  onClose: () => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ onClose }) => {
  const { saveCustomBlock } = useProjectStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [template, setTemplate] = useState('<section>\n  <h2>{{heading}}</h2>\n  <p>{{description}}</p>\n</section>')
  const [fields, setFields] = useState<{ name: string; label: string; defaultVal: string }[]>([
    { name: 'heading', label: 'Heading', defaultVal: 'Heading' },
    { name: 'description', label: 'Description', defaultVal: 'Description here' },
  ])

  const addField = () => {
    setFields([...fields, { name: '', label: '', defaultVal: '' }])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const updateField = (index: number, key: 'name' | 'label' | 'defaultVal', value: string) => {
    const updated = [...fields]
    updated[index] = { ...updated[index], [key]: value }
    setFields(updated)
  }

  const handleSave = () => {
    if (!name.trim() || !template.trim()) return

    const schema: Record<string, ContentSlot> = {}
    for (const field of fields) {
      if (field.name.trim()) {
        schema[field.name.trim()] = {
          type: 'text',
          default: field.defaultVal || '',
          label: field.label || field.name,
        }
      }
    }

    const block: BlockDefinition = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: 'custom',
      description: description.trim(),
      source: 'custom',
      defaultVariant: 'default',
      schema,
      variants: [
        {
          id: 'default',
          name: 'Default',
          template: template.trim(),
        },
      ],
    }

    saveCustomBlock(block)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 640, maxHeight: '90vh',
        overflow: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>✏️ Create Custom Block</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: '#888' }}>✕</button>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>Block Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Team Section" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontWeight: 600, color: '#333', fontSize: '0.85rem' }}>Content Fields</label>
              <button onClick={addField} style={{ padding: '4px 12px', border: '1px solid #2563EB', borderRadius: 6, background: 'transparent', color: '#2563EB', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Field</button>
            </div>
            {fields.map((field, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <input value={field.name} onChange={(e) => updateField(i, 'name', e.target.value)} placeholder="Field name (e.g., heading)" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem', fontFamily: 'monospace' }} />
                <input value={field.label} onChange={(e) => updateField(i, 'label', e.target.value)} placeholder="Label" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }} />
                <input value={field.defaultVal} onChange={(e) => updateField(i, 'defaultVal', e.target.value)} placeholder="Default" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }} />
                <button onClick={() => removeField(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', fontSize: '1rem' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>HTML Template</label>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>Use <code style={{background:'#f0f0f0',padding:'2px 6px',borderRadius:4}}>{'{{fieldName}}'}</code> placeholders for content fields.</p>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={12}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8,
                fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, resize: 'vertical',
              }}
            />
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !template.trim()}
            style={{
              padding: '8px 20px', border: 'none', borderRadius: 8,
              background: name.trim() && template.trim() ? '#2563EB' : '#ccc',
              color: '#fff', cursor: name.trim() && template.trim() ? 'pointer' : 'default',
              fontWeight: 600, fontSize: '0.85rem',
            }}
          >
            Save Block
          </button>
        </div>
      </div>
    </div>
  )
}