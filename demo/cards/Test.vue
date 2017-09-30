<template>
<div class="test-card">
  <h1> Test passed! </h1>
  <p> options work, too! look: {{ canEdit }} </p>
</div>
</template>

<script>
export default {
  name: 'test',
  props: ['options'],
  computed: {
    canEdit () {
      console.log(this.options)
      return this.options.Editor.canEdit
    }
  }
}
</script>
