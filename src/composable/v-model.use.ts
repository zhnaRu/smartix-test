import { computed } from 'vue'

export const vModelUse = <P extends Record<string, unknown>, K extends keyof P>(
  props: P,
  emit: (name: string, ...args: any[]) => void,
  key?: K
) => {
  const propKey = key || 'value' as K
  const eventName = propKey === 'value' ? 'input' : `${propKey}:update`

  return computed<P[K]>({
    get: () => props[propKey],
    set: (val) => emit(eventName, val)
  })
}
