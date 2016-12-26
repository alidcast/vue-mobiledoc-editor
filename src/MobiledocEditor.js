import Vue from 'vue'
import Mobiledoc from 'mobiledoc-kit'
import MobiledocComponent from 'addons/ComponentCard'

export const EMPTY_MOBILEDOC = {
  version: '0.3.0',
  markups: [],
  atoms: [],
  cards: [],
  sections: []
}

 const MobiledocEditor = (ctrl) => ({
  render(h) {
    return (
      <div id='mobiledoc-editor_container'>
        { this.$slots.default }
        <div id='mobiledoc-editor_editor' ref='editor' />
      </div>
    )
  },

  props: {
    // editor options
    mobiledoc:        { type: Object,   default: () => EMPTY_MOBILEDOC },
    atoms:            { type: Array,    default: () => [] },
    cards:            { type: Array,    default: () => [] },
    placeholder:      { type: String,   default: () => '' },
    autofocus:        { type: Boolean,  default: () => true },
    spellCheck:       { type: Boolean,  default: () => true },
    serializeVersion: { type: String,   default: () => '0.3.0' },
    // additional settings
    enableEditing:    { type: Boolean,  default: () => true }
  },

  computed: {
    editorOptions() {
      return {
        autofocus: this.autofocus,
        spellcheck: this.spellcheck,
        placeholder: this.placeholder,
        serializeVersion: this.serializeVersion,
        atoms: this.atoms,
        cards: this.cards,
        mobiledoc: this.mobiledoc
      }
    },
  },

  beforeMount() {  // create editor instance and event hooks
    this.$emit('willCreateEditor')

    ctrl.editor = new Mobiledoc.Editor(this.editorOptions)

    if (this.enableEditing !== ctrl.canEdit) ctrl.toggleEditMode()

    this.$emit('didCreateEditor', ctrl.editor)

    ctrl.editor.inputModeDidChange(() => {
      ctrl.$emit('inputModeChanged')
    })

    ctrl.editor.postDidChange(() => {
      // serialize the editor's post to the mobiledoc version format
      // any cards or atoms present in doc, will be ommited
      const mobiledoc = ctrl.editor.serialize(this.serializeVersion)
      this.$emit('postWasUpdated', mobiledoc)
    })
  },

  mounted() { // replace editor element with rendered post
    // mounted is called when any data changes so we make sure it only runs once
    this.$once('mounted', () => ctrl.editor.render(this.$refs.editor))
    this.$emit('mounted')
  },

  beforeDestroy() {
    ctrl.editor.destroy()
  }
})

export default (ctrl) => {
  if (ctrl instanceof Vue !== true) {
    throw new Error('You did not pass a Mobiledoc Controller to the Mobiledoc Editor')
  }
  return MobiledocEditor(ctrl)
}


// TODO dynamically added component cards with computed properties
// componentCards() {
//   let cards = this.cards
//   let cmpCards = []
//   for (let i = 0; i < cards.length; i++) {
//     let card = cards[i]
//     if(card instanceof MobiledocComponent) {
//       cmpCards.push({ [card.name]: card })
//     }
//   }
//   return cmpCards
// }

// components: {
//   ...this.componentCards
// },

// directives: { // or dynamically added with this.$options.directives
//   [CARD_HOOK]: {
//     bind(el, binding) {
//     },
//     unbind() { }
//   }
// }
