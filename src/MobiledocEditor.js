import Vue from 'vue'
import Mobiledoc from 'mobiledoc-kit'

export const EMPTY_MOBILEDOC = {
  version: '0.3.0',
  markups: [],
  atoms: [],
  cards: [],
  sections: []
}

const MobiledocEditor = (ctrl) => ({
  render (h) {
    return (
      <div id='mobiledoc-editor_container'>
        { this.$slots.default }
        <div id='mobiledoc-editor_editor' ref='editor' />
      </div>
    )
  },

  props: {
    mobiledoc: { type: Object, default: () => EMPTY_MOBILEDOC },
    atoms: { type: Array, default: () => [] },
    cards: { type: Array, default: () => [] },
    placeholder: { type: String, default: () => '' },
    autofocus: { type: Boolean, default: () => true },
    spellCheck: { type: Boolean, default: () => true },
    serializeVersion: { type: String, default: () => '0.3.0' },
    cardOptions: { type: Object, default: () => {} },
    enableEditing: { type: Boolean, default: () => true }
  },

  computed: {
    editorOptions () {
      return {
        autofocus: this.autofocus,
        spellcheck: this.spellcheck,
        placeholder: this.placeholder,
        serializeVersion: this.serializeVersion,
        mobiledoc: this.mobiledoc,
        atoms: this.atoms,
        cards: this.cards,
        cardOptions: this.cardOptions
      }
    }
  },

  beforeMount () {
    this._initEditorWithEventHooks()
  },

  mounted () {
    // mounted is called when any data changes so we make sure it only runs once
    this.$once('mounted', () => this._renderEditorPost())
    this.$emit('mounted')
  },

  methods: {
    _initEditorWithEventHooks () {
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

    _renderEditorPost () {
      ctrl.editor.render(this.$refs.editor)
    }
  },

  beforeDestroy () {
    ctrl.editor.destroy()
  }
})

export default (ctrl) => {
  if (ctrl instanceof Vue !== true) {
    throw new Error('You did not pass a Mobiledoc Controller to the Mobiledoc Editor')
  }
  return MobiledocEditor(ctrl)
}
