<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <Editor
      :placeholder="placeholder"
      :atoms="atoms"
      :cards="cards"
      @willCreateEditor="willCreate"
      @didCreateEditor="didCreate">
      <Toolbar />
      <button @click="toggle"> Toggle </button>
      <Btn type="atom" name="mention"> Atom </Btn>
      <Btn type="card" name="image"> Card </Btn>
    </Editor>

    <h1> Another Mobiledoc Editor </h1>
    <AnotherEditor :placeholder="placeholder" />
  </div>
</template>


<script>
import Mobiledoc, { createMobiledoc } from "src/index.js"

import createComponentCard from "addons/ComponentCard"

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

const ImageCard = new createComponentCard('image', {
  render()  {
    var el = document.createElement('div')
    var text = document.createTextNode("image");
    el.appendChild(text);
    return el
  }
})

export default {
  data: () => ({
    placeholder: "Start Writing...",
    cards: [ImageCard],
    atoms: [Mention]
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
