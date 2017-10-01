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

  data () {
    return {
      editorVm: this.options.getEditorVm()
    }
  },

  computed: {
    canEdit () {
      return this.editorVm.canEdit()
    }
  }
}
</script>
