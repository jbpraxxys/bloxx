import type { FC } from 'react'

interface IconProps {
  name: string
  size?: number
  className?: string
}

export const Icon: FC<IconProps> = ({ name, size = 20, className }) => (
  <span className={className} style={{ fontSize: size, lineHeight: 1 }} role="img" aria-label={name}>
    {name}
  </span>
)
