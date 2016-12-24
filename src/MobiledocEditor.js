import Vue from 'vue'
import Mobiledoc from 'mobiledoc-kit'

export const EMPTY_MOBILEDOC = {
  version: '0.3.0',
  markups: [],
  atoms: [],
  cards: [],
  sections: []
}

// editor pass display or edit mode
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
    autofocus: { type: Boolean, default: () => true },
    spellCheck: { type: Boolean, default: () => true },
    placeholder: { type: String, default: () => '' },
    serializeVersion: { type: String, default: () => '0.3.0' },
    atoms: { type: Array, default: () => [] },
    cards: { type: Array, default: () => [] },
    mobiledoc: { type: Object, default: () => EMPTY_MOBILEDOC }
  },

  computed: {
    _editorOptions() {
      return {
        autofocus: this.autofocus,
        spellcheck: this.spellcheck,
        placeholder: this.placeholder,
        serializeVersion: this.serializeVersion,
        atoms: this.atoms,
        cards: this.cards,
        mobiledoc: this.mobiledoc
      }
    }
  },

  beforeMount() {  // create editor instance and event hooks
    this.$emit('willCreateEditor')

    ctrl.editor = new Mobiledoc.Editor(this._editorOptions)

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
    throw new Error('You did not pass Mobiledoc Controller to Mobiledoc Editor')
  }
  return MobiledocEditor(ctrl)
}
