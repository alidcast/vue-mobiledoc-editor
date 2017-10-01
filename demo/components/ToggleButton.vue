<template lang="html">
<button @click="toggle"> Toggle </button>
</template>

<script>
export default {
  inject: ['editorVm'],

  methods: {
    toggle() {
      this.editorVm.toggleEditMode()
    }
  }
}
</script>
