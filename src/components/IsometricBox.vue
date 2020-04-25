<template lang="pug">
  g.github-calendar__box
    isometric-polygon(
      v-for="(points, i) in polygons"
      :key="i"
      :points="points" :color="colors[i]"
    )
</template>

<script>
import IsometricPolygon from './IsometricPolygon.vue'

export default {
  name: 'IsometricBox',
  components: {
    IsometricPolygon
  },
  props: {
    position: {
      type: Object,
      default: {x: 0, y: 0, z: 0}
    },
    size: {
      type: Object,
      default: {x: 0, y: 0, z: 0}
    },
    colors: {
      type: Array,
      default: ['#C7C7C7', '#DEDEDE', '#F1F1F1']
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    polygons () {
      return [
        [
          {x: this.size.x + this.position.x, y: this.position.y, z: this.position.z},
          {x: this.size.x + this.position.x, y: this.size.y + this.position.y, z: this.position.z},
          {x: this.size.x + this.position.x, y: this.size.y + this.position.y, z: this.size.z + this.position.z},
          {x: this.size.x + this.position.x, y: this.position.y, z: this.size.z + this.position.z},
        ],
        [
          {x: this.position.x, y: this.size.y + this.position.y, z: this.position.z},
          {x: this.size.x + this.position.x, y: this.size.y + this.position.y, z: this.position.z},
          {x: this.size.x + this.position.x, y: this.size.y + this.position.y, z: this.size.z + this.position.z},
          {x: this.position.x, y: this.size.y + this.position.y, z: this.size.z + this.position.z},
        ],
        [
          {x: this.position.x, y: this.position.y, z: this.size.z + this.position.z},
          {x: this.size.x + this.position.x, y: this.position.y, z: this.size.z + this.position.z},
          {x: this.size.x + this.position.x, y: this.size.y + this.position.y, z: this.size.z + this.position.z},
          {x: this.position.x, y: this.size.y + this.position.y, z: this.size.z + this.position.z}
        ]
      ]
    }
  }
}
</script>
