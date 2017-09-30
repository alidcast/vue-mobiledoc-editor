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
      ref="editorVM">
      <ToggleButton />
      <Toolbar />
      <Btn type="atom" name="mention"> Atom </Btn>
      <Btn type="card" name="test"> Card </Btn>
    </Editor>

    <h1> Another Mobiledoc Editor </h1>
    <Editor :placeholder="placeholder" />
  </div>
</template>


<script>
import Mobiledoc, { MobiledocToolbar, createMobiledoc, EMPTY_MOBILEDOC } from "src/index.js"
import Test from './cards/Test.vue'
import createComponentCard from "addons/compToCard"
import ToggleButton from './components/ToggleButton'

const Mention = {
  name: 'mention',
  type: 'dom',
  render() {
    var el = document.createElement('div')
    var text = document.createTextNode("@hello");
    el.appendChild(text);
    return el
  }
}

const TestCard = createComponentCard(Test)

export default {
  data: () => ({
    placeholder: "Start Writing...",
    cards: [TestCard],
    atoms: [Mention]
  }),

  computed: {
    cardOptions () {
      return {
        Editor: this.$refs.editorVM
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
    Btn: Mobiledoc.Button,
    Toolbar: MobiledocToolbar,
    ToggleButton
  }
}
</script>
