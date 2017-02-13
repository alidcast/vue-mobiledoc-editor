import Vue from 'vue'
import { UI } from 'mobiledoc-kit'

/**
 * A {MobiledocController} mediates interaction between a mobiledoc editor and
 * its other components, such as buttons and toolbars.
 *
 * Generally, the {MobiledocEditor} updates the controller's data, such as
 * updating the `editor` property with the correct instance, and the
 * {MobiledocButton} triggle the controller's methods.
 *
 */
export default  () => {
  return new Vue({

    data: () => ({
      editor: {},
      activeMarkupTags: [],
      activeSectionTags: [],
      canEdit: true
    }),

    created() {
      this.$on('inputModeChanged', () => {   // TODO debounce
        this._updateActiveMarkupTags()
        this._updateActiveSectionTags()
      })
    },

    methods: {
      toggleMarkup(tag) {
        this.editor.toggleMarkup(tag)
      },

      toggleSection(tag) {
        this.editor.toggleSection(tag)
      },

      toggleLink(tag='a') {
        if (!this.editor.hasCursor()) return // no cursor selected
        else if (this.editor.hasActiveMarkup(tag)) this.editor.toggleMarkup(tag) // deselect
        else UI.toggleLink(this.editor)
      },

      addAtom(name, text='', payload={}) {
        this.editor.insertAtom(name, text, payload)
      },

      addCard(name, payload={}, editMode=false) {
        this.editor.insertCard(name, payload, editMode)
      },

      toggleEditMode() {
        this.canEdit = ! this.canEdit
        this.canEdit ? this.editor.enableEditing() : this.editor.disableEditing()
      },

      // controller helpers
      //
      _updateActiveMarkupTags() {
        this.activeMarkupTags = this.editor.activeMarkups.map(m => m.tagName)
      },

      _updateActiveSectionTags() {
        // editor.activeSections are leaf sections.
        // map parent section tag names (e.g. 'p', 'ul') so that list buttons
        // are updated
        this.activeSectionTags = this.editor.activeSections.map(s => {
          return s.isNested ? s.parent.tagName : s.tagName
        })
      }
    }
  })
}
