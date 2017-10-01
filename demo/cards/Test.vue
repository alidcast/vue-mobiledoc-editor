<template>
<div class="test-card">
  <h1> Test passed! </h1>
  <p> options work, too! look: {{ canEdit }} </p>
</div>
</template>

<script>
export default {
  name: 'test-card',
  props: ['options'],
  computed: {
    canEdit () {
      alert(this.optins.Editor)
      return this.options.Editor.canEdit
    }
  }
}
</script>
