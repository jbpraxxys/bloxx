import React from 'react'

export const LoadingSpinner: React.FC<{ size?: number; message?: string }> = ({ size = 32, message }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
    <div style={{
      width: size, height: size,
      border: '3px solid #e0e0e0', borderTopColor: '#2563EB',
      borderRadius: '50%', animation: 'bloxx-spin 0.8s linear infinite',
    }} />
    {message && <p style={{ marginTop: 16, color: '#888', fontSize: '0.85rem' }}>{message}</p>}
    <style>{`@keyframes bloxx-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)