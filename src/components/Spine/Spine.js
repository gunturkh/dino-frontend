import { memo } from 'react'
import { PixiComponent, applyDefaultProps } from 'pixi/react'
import { Spine as PixiSpine } from 'pixi-spine'

import { useSpine } from '../../utils/useSpine'

const PixiComponentSpine = PixiComponent('Spine', {
  create: ({ spineData }) => {
    const spine = new PixiSpine(spineData)

    return spine
  },
  applyProps: (instance, oldProps, newProps) => {
    const {
      mixes = [],
      scale = 1,
      setAnimations,
      ...rest
    } = newProps

    applyDefaultProps(instance, oldProps, rest)
    instance.scale.set(scale)
    mixes.forEach((mix) => instance.stateData.setMix(mix.from, mix.to, mix.duration))

    if (setAnimations) {
      setAnimations(instance.state)
    }
  },
  config: {
    destroy: false,
  },
})

export const Spine = memo(({ spineConfig, ...props }) => {
  const spine = useSpine(spineConfig)

  if (!spine) {
    return null
  }

  return <PixiComponentSpine spineData={spine} {...props} />
})