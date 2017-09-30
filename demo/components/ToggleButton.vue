<template lang="html">
<button @click="toggle"> Toggle </button>
</template>

<script>
export default {
  inject: ['toggleEditMode'],

  methods: {
    toggle() {
      this.toggleEditMode()
    }
  }
}
</script>
