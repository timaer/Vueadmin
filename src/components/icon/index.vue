<template>
      <svg :class="classname!=undefined?'svgClass '+classname:'svgClass'" aria-hidden='true' @click="$emit('click')"><use :xlink:href="'#'+src" /></svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    src: String,
    classname:String
  }
}
</script>
<style scoped>
  .svgClass{display:inline-block;width:1em;height:1em;}
</style>


