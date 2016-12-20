<template>
  <div id='mobiledoc-editor_container'>
    <slot />
    <div id='mobiledoc-editor_editor' ref='editor' />
  </div>
</template>

<!-- // <style lang='sass'>
// @import '~mobiledoc-kit/dist/css/mobiledoc-kit.css'
// </style> -->

<script>
import Mobiledoc, { UI } from 'mobiledoc-kit'

const EMPTY_MOBILEDOC = {
  version: '0.3.0',
  markups: [],
  atoms: [],
  cards: [],
  sections: []
}

export default {
  props: {
    autofocus: { type: Boolean, default: () => true },
    spellCheck: { type: Boolean, default: () => true },
    placeholder: { type: String, default: () => '' },
    serializeVersion: { type: String, default: () => '0.3.0' },
    atoms: { type: Array, default: () => [] },
    cards: { type: Array, default: () => [] },
    mobiledoc: { type: Object, default: () => EMPTY_MOBILEDOC }
  },

  data: () => ({
      activeMarkupTags: [],
      activeSectionTags: []
  }),

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

  created() {
    this.$on('toggleMarkup', this.toggleMarkup)
    this.$on('toggleSection', this.toggleSection)
    this.$on('toggleLink', this.toggleLink)
  },

  beforeMount() {  // create editor instance and event hooks
    this.$emit('willCreateEditor')

    this.editor = new Mobiledoc.Editor(this._editorOptions)

    this.editor.inputModeDidChange(() => {
      this._setActiveMarkupTags()
      this._setActiveSectionTags()
    })

    this.$emit('didCreateEditor', this.editor)

    this.editor.postDidChange(() => {
      // serialize the editor's post to the mobiledoc version format
      // any cards or atoms present in doc, will be ommited
      const mobiledoc = this.editor.serialize(this.serializeVersion)
      this.$emit('onChange', mobiledoc)
    })
  },

  mounted() { // replace editor element with rendered post
    // mounted is called when any data changes so we make sure it only runs once
    this.$once('mounted', () => this.editor.render(this.$refs.editor))
    this.$emit('mounted')
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    toggleMarkup(tagName) {
      this.editor.toggleMarkup(tagName)
    },

    toggleSection(tagName) {
      this.editor.toggleSection(tagName)
    },

    toggleLink() {
      if (!this.editor.hasCursor()) { // if text isn't selected
        return
      }

      if (this.editor.hasActiveMarkup('a')) {
        this.editor.toggleMarkup('a')
      } else {
        UI.toggleLink(this.editor)
      }
    },

    // addAtom(atomName, text, payload) {
    //   this.editor.insertAtom(atomName, text, payload)
    // },
    //
    // addCard(cardName, payLoad, editMode = false) {
    //   this.editor.insertCard(cardName, payload, editMode)
    // },
    //
    // addCardInEditMode(cardName, payLoad, editMode = true) {
    //   this.editor.insertCard(cardName, payload, editMode)
    // },

    _setActiveMarkupTags() {
      this.activeMarkupTags = this.editor.activeMarkups.map(m => m.tagName)
    },

    _setActiveSectionTags() {
      // editor.activeSections are leaf sections
      // Map section tag names (e.g. 'p', 'ul', 'ol') so that list buttons are updated
      this.activeSectionTags = this.editor.activeSections.map(s => {
        return s.isNested ? s.parent.tagName : s.tagName
      })
    }
  }
}
</script>
