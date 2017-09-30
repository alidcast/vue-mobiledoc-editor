import Mobiledoc, { UI } from 'mobiledoc-kit'

export const EMPTY_MOBILEDOC = {
  version: '0.3.0',
  markups: [],
  atoms: [],
  cards: [],
  sections: []
}

export default {
  render (h) {
    return (
      <div id='mobiledoc-editor_container'>
        { this.$slots.default }
        <div id='mobiledoc-editor_editor' ref='editor' />
      </div>
    )
  },

  provide () {
    return {
      editor: this.editor,
      activeMarkupTags: this.activeMarkupTags,
      activeSectionTags: this.activeSectionTags,
      canEdit: this.canEdit,
      toggleMarkup: this.toggleMarkup,
      toggleSection: this.toggleSection,
      toggleLink: this.toggleLink,
      toggleEditMode: this.toggleEditMode,
      addAtom: this.addAtom,
      addCard: this.addCard
    }
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

  data: () => ({
    editor: {},
    activeMarkupTags: [],
    activeSectionTags: [],
    canEdit: true
  }),

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
    // make sure the editor's post is only rendered once
    this.$once('mounted', () => this._renderEditorPost())
    this.$emit('mounted')
  },

  methods: {
    toggleMarkup (tag) {
      this.editor.toggleMarkup(tag)
    },

    toggleSection (tag) {
      this.editor.toggleSection(tag)
    },

    toggleLink (tag = 'a') {
      if (!this.editor.hasCursor()) return // no cursor selected
      else if (this.editor.hasActiveMarkup(tag)) this.editor.toggleMarkup(tag) // deselect
      else UI.toggleLink(this.editor)
    },

    addAtom (name, text = '', payload = {}) {
      this.editor.insertAtom(name, text, payload)
    },

    addCard (name, payload = {}, editMode = false) {
      this.editor.insertCard(name, payload, editMode)
    },

    toggleEditMode () {
      this.canEdit = !this.canEdit
      this.canEdit ? this.editor.enableEditing() : this.editor.disableEditing()
    },

    _initEditorWithEventHooks () {
      this.$emit('willCreateEditor')

      this.editor = new Mobiledoc.Editor(this.editorOptions)

      if (this.enableEditing !== this.canEdit) this.toggleEditMode()

      this.$emit('didCreateEditor', this.editor)

      this.editor.inputModeDidChange(() => {
        this._updateActiveMarkupTags()
        this._updateActiveSectionTags()
      })

      this.editor.postDidChange(() => {
        // serialize the editor's post to the mobiledoc version format
        // any cards or atoms present in doc, will be ommited
        const mobiledoc = this.editor.serialize(this.serializeVersion)
        this.$emit('postWasUpdated', mobiledoc)
      })
    },

    _renderEditorPost () {
      this.editor.render(this.$refs.editor)
    },

    _updateActiveMarkupTags () {
      this.activeMarkupTags = this.editor.activeMarkups.map(m => m.tagName)
    },

    _updateActiveSectionTags () {
      // editor.activeSections are leaf sections.
      // map parent section tag names (e.g. 'p', 'ul') so that
      // list buttons are updated
      this.activeSectionTags = this.editor.activeSections.map(s => {
        return s.isNested ? s.parent.tagName : s.tagName
      })
    }
  },

  beforeDestroy () {
    this.editor.destroy()
  }
}
