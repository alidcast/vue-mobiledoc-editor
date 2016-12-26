<template>
  <div id="app" class="component">
    <h1> Vue Mobiledoc Editor 1 </h1>
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
  </div>
</template>


<script>
import { MobiledocController, MobiledocEditor, MobiledocButton }  from "index"
import MobiledocToolbar from "addons/MobiledocToolbar"
import MobiledocComponent from "addons/ComponentCard"

let Mobiledoc = new MobiledocController()

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

const ImageCard = new MobiledocComponent('image', {
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
      Mobiledoc.toggleEditMode()
    }
  },

  components: {
    MobiledocEditor:  MobiledocEditor(Mobiledoc),
    MobiledocButton:  MobiledocButton(Mobiledoc),
    MobiledocToolbar: MobiledocToolbar(Mobiledoc)
  }
}
</script>
