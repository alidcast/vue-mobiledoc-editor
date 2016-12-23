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
      <MobiledocButton type="atom" name="mention"> Atom </MobiledocButton>
      <MobiledocButton type="card" name="image"> Card </MobiledocButton>
    </MobiledocEditor>
  </div>
</template>


<script>
import { MobiledocController, MobiledocEditor, MobiledocButton }  from "index"
import MobiledocToolbar from "addons/MobiledocToolbar"

let Mobiledoc = new MobiledocController()

const Image = {
  name: 'image',
  type: 'dom',
  render: function render() {
    var el = document.createElement('div')
    var text = document.createTextNode("Image");
    el.appendChild(text);
    return el
  }
}

const Mention = {
  name: 'mention',
  type: 'dom',
  render: function render() {
    var el = document.createElement('div')
    var text = document.createTextNode("@hello");
    el.appendChild(text);
    return el
  }
}

export default {
  data: () => ({
    placeholder: "Start Writing...",
    cards: [Image],
    atoms: [Mention]
  }),

  methods: {
    willCreate() {
      console.log('will create!')
    },
    didCreate() {
      console.log('did create!')
    }
  },
  
  components: {
    MobiledocEditor:  MobiledocEditor(Mobiledoc),
    MobiledocButton:  MobiledocButton(Mobiledoc),
    MobiledocToolbar: MobiledocToolbar(Mobiledoc)
  },
}
</script>
