<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <Editor
      :placeholder="placeholder"
      :atoms="atoms"
      :cards="cards"
      :cardOptions="cardOptions"
      @willCreateEditor="willCreate"
      @didCreateEditor="didCreate">
      <Toolbar />
      <button @click="toggle"> Toggle </button>
      <Btn type="atom" name="mention"> Atom </Btn>
      <Btn type="card" name="test"> Card </Btn>
    </Editor>

    <h1> Another Mobiledoc Editor </h1>
    <AnotherEditor :placeholder="placeholder" />
  </div>
</template>


<script>
import Mobiledoc, { createMobiledoc } from "src/index.js"
import Test from './cards/Test.vue'
import createComponentCard from "addons/compToCard"

const { AnotherEditor } = createMobiledoc('Another')

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
    atoms: [Mention],
    cardOptions: {
      ctrl: Mobiledoc.Ctrl
    }
  }),

  methods: {
    willCreate() {
      console.log('will create!')
    },
    didCreate() {
      console.log('did create!')
    },
    toggle() {
      Mobiledoc.Ctrl.toggleEditMode()
    }
  },

  components: {
    Editor: Mobiledoc.Editor,
    Btn: Mobiledoc.Btn,
    Toolbar: Mobiledoc.Toolbar,
    AnotherEditor
  }
}
</script>
