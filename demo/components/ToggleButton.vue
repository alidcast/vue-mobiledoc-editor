<template lang="html">
<button @click="toggle"> Toggle </button>
</template>

<script>
export default {
  inject: ['getEditorVm'],

  methods: {
    toggle() {
      this.getEditorVm().toggleEditMode()
    }
  }
}
</script>
