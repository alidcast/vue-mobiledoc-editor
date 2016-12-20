<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <mobiledoc-editor :placeholder="placeholder">
      <mobiledoc-button type="markup" for="strong"> Bold </mobiledoc-button>
      <mobiledoc-button type="markup" for="link"> Link </mobiledoc-button>
      <mobiledoc-button type="section" for="h1"> H1 </mobiledoc-button>
    </mobiledoc-editor>
  </div>
</template>

<script>
import MobiledocEditor from "src/MobiledocEditor.vue"
import MobiledocButton from "src/MobiledocButton.vue"

export default {
  name: "app",

  components: {
    MobiledocEditor,
    MobiledocButton
  },

  data() {
    return {
      placeholder: "Start Writing..."
    }
  }
}
</script>
