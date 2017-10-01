import titlelize from './helpers/titlelize'

const button = (h, ctx, clickAction) => {
  return (
    <button
      class='mobiledoc-button'
      id={ `mobiledoc-${ctx.type}-button` }
      onClick={ clickAction }>
      { ctx.label }
      { ctx.$slots.default }
    </button>
  )
}

export default {
  props: {
    // all buttons
    type: { type: String, required: true },
    label: { type: String },
    // markup or section buttons
    tag: { type: String },
    // link buttons
    prompt: { type: Object },
    // atom or card buttons
    name: { type: String },
    text: { type: String, default: () => '' },
    payload: { type: Object, default: () => {} },
    // card buttons
    editMode: { type: Boolean, default: () => true }
  },

  inject: ['getEditorVm'],

  render (h) {
    const editorVm = this.getEditorVm()
    const type = titlelize(this.type)
    if (type === 'Markup') {
      if (!this.tag) throw new Error(`Markup buttons require a 'tag' prop`)
      return button(h, this, () => editorVm.toggleMarkup(this.tag))
    } else if (type === 'Section') {
      if (!this.tag) throw new Error(`Section buttons require a 'tag' prop`)
      return button(h, this, () => editorVm.toggleSection(this.tag))
    } else if (type === 'Link') {
      return button(h, this, () => editorVm.toggleLink())
    } else if (type === 'Atom') {
      if (!this.name) throw new Error(`Atom buttons require a 'name' prop`)
      const { name, text, payload } = this
      return button(h, this, () => editorVm.addAtom(name, text, payload))
    } else if (type === 'Card') {
      if (!this.name) throw new Error(`Card buttons require a 'name' prop`)
      const { name, payload, editMode } = this
      return button(h, this, () => editorVm.addCard(name, payload, editMode))
    } else throw new Error(`The button ${type} does not exist`)
  }
}
