<template lang="pug">
  g.github-calendar__day(@mouseover="hover = true" @mouseleave="hover = false")
    isometric-box(
      :position="{x: position.x * 9.5, y: position.y * 9.5, z: 0}"
      :size="{x: 8, y: 8, z: 2.5 + height}"
      :colors="color3d(color)"
      :hover="hover"
      )
    g(
      v-if="hover"
      :transform="`translate(${position2d.a}, ${position2d.b})`"
      )
      text(
        text-anchor="middle"
        class="text"
      ) {{ contributionCount }}
</template>

<script>
import { IsometricEngine } from '../mixins/isometric-engine'
import IsometricBox from './IsometricBox.vue'

export default {
  name: 'Day',
  components: {
    IsometricBox
  },
  props: [
    'position',
    'color',
    'contributionCount',
  ],
  mixins: [IsometricEngine],
  data() {
    return {
      hover: false
    }
  },
  computed: {
    height() {
      return this.contributionCount * 2
    },
    color3d() {
      return function (color) {
        if (color === 'var(--color-calendar-graph-day-L1-bg)') return ['#B9C874', '#CBD888', '#DCEA9B']
        if (color === 'var(--color-calendar-graph-day-L2-bg)') return ['#70AA53', '#84BC68', '#98CE7C']
        if (color === 'var(--color-calendar-graph-day-L3-bg)') return ['#008A25', '#2B9D3D', '#48B056']
        if (color === 'var(--color-calendar-graph-day-L4-bg)') return ['#004F08', '#006417', '#157933']
        return ['#C7C7C7', '#DEDEDE', '#F1F1F1']
      }
    },
    position2d() {
      return this.xyzab(this.position.x * 9.5, this.position.y * 9.5, -2 + this.height)
    }
  }
}
</script>

<style>
  .text {
    font: normal 1rem sans-serif;
    user-select: none;
    transform: scale(1);
    animation-name: scale;
    animation-duration: 0.25s;
    z-index: 1;
  }

  @keyframes scale {
    from {transform: scale(0);}
    to {transform: scale(1);}
  }
</style>
