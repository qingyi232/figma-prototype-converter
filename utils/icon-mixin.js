import { makeSvg } from './svg-icons.js'

export const iconMixin = {
  methods: {
    svgIcon(type, color) {
      return makeSvg(type, color || '#333')
    }
  }
}
