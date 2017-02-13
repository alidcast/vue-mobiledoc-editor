<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor </h1>
    <MobiledocEditor
      :placeholder="placeholder"
      :atoms="atoms"
      :cards="cards"
      @willCreateEditor="willCreate"
      @didCreateEditor="didCreate">
      <MobiledocToolbar />
      <button @click="toggle"> Toggle </button>
      <MobiledocButton type="atom" name="mention"> Atom </MobiledocButton>
      <MobiledocButton type="card" name="image"> Card </MobiledocButton>
    </MobiledocEditor>

    <h1> Another Mobiledoc Editor </h1>
    <AnotherMobiledocEditor
      :placeholder="placeholder">
    </AnotherMobiledocEditor>
  </div>
</template>


<script>
import {
  Mobiledoc, MobiledocController, MobiledocEditor, MobiledocButton, MobiledocToolbar
} from "index"
import createComponentCard from "addons/ComponentCard"

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
      MobiledocController.toggleEditMode()
    }
  },

  components: {
    MobiledocEditor,
    MobiledocButton,
    MobiledocToolbar,
    AnotherMobiledocEditor: Mobiledoc.editor(new Mobiledoc.controller())

  }
}
</script>
