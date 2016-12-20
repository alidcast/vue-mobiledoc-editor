<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <mobiledoc-editor :placeholder="placeholder">
      <MobiledocToolbar />
    </mobiledoc-editor>
  </div>
</template>

<script>
import MobiledocEditor from "MobiledocEditor"
import MobiledocToolbar from "MobiledocToolbar"

export default {
  name: "app",

  components: {
    MobiledocEditor,
    MobiledocToolbar
  },

  data() {
    return {
      placeholder: "Start Writing..."
    }
  }
}
</script>
