export const IsometricEngine = {
  methods: {
    xyzab (x, y, z) {
      return {
        a: (-3 * x) + (3 * y) + (0),
        b: ((3 * x) + (3 * y) + (-6 * z)) * Math.tan(30 * Math.PI/180)
      }
    }
  }
}