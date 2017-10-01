<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <Editor
      :placeholder="placeholder"
      :atoms="atoms"
      :cards="cards"
      :cardOptions="cardOptions"
      @willCreateEditor="willCreate"
      @didCreateEditor="didCreate"
      ref="editorComponent">
      <EditorToggleButton />
      <EditorToolbar />
      <EditorButton type="atom" name="mention" label="atom" />
      <EditorButton type="card" name="test-card" label="card" />
    </Editor>
<!--
    <h1> Another Mobiledoc Editor </h1>
    <Editor :placeholder="placeholder" /> -->
  </div>
</template>


<script>
import Mobiledoc, { MobiledocToolbar, createMobiledoc, EMPTY_MOBILEDOC } from "src/index.js"
import Test from './cards/Test.vue'
import compToCard from "addons/compToCard"
import EditorToggleButton from './components/ToggleButton'

const Mention = {
  name: 'mention',
  type: 'dom',
  render () {
    var el = document.createElement('div')
    var text = document.createTextNode("@hello")
    el.appendChild(text)
    return el
  }
}

export default {
  data: () => ({
    placeholder: "Start Writing...",
    atoms: [Mention],
    cards: [compToCard(Test)]
  }),

  computed: {
    cardOptions () {
      return {
        Editor: this.$refs.editorComponent
      }
    }
  },

  methods: {
    willCreate() {
      console.log('will create!')
    },
    didCreate() {
      console.log('did create!')
    }
  },

  components: {
    Editor: Mobiledoc.Editor,
    EditorButton: Mobiledoc.Button,
    EditorToolbar: MobiledocToolbar,
    EditorToggleButton
  }
}
</script>
