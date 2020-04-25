<template lang="pug">
  polygon.github-calendar__polygon(
    :points="pointsForSVG(points)"
    :fill="color"
    stroke="black"
  )
</template>

<script>
import { IsometricEngine } from '../mixins/isometric-engine'

export default {
  name: 'SvgPolygon',
  props: {
    color: {
      type: String,
      default: '#99FF00'
    },
    points: {
      type: Array,
      default: [{x: 0, y: 0, z: 0}]
    }
  },
  mixins: [IsometricEngine],
  computed: {
    pointsForSVG () {
      return function (points) {
        let result = ''
        for (const i in points) {
          const points3D = points[i]
          const points2D = this.xyzab(points3D.x, points3D.y, points3D.z)
          result = `${result} ${points2D.a},${points2D.b}`.trim()
        }
        return result
      }
    }
  }
}
</script>

<style>
  .github-calendar__polygon {
    transition: 0.2s;
    stroke-opacity: 0.3;
  }
</style>
