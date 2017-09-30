import titlelize from './utils/titlelize'

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
    type: { type: String, required: true },
    label: { type: String },
    // markup or section
    tag: { type: String },
    // link
    prompt: { type: Object },
    // card
    name: { type: String },
    text: { type: String },
    payload: { type: Object },
    mode: { type: String }
  },

  inject: [
    'toggleMarkup',
    'toggleSection',
    'toggleLink',
    'toggleEditMode',
    'addAtom',
    'addCard'
  ],

  render (h) {
    const type = titlelize(this.type)
    if (type === 'Markup') {
      if (!this.tag) throw new Error(`Markup buttons require a 'tag' prop`)
      return button(h, this, () => this.toggleMarkup(this.tag))
    } else if (type === 'Section') {
      if (!this.tag) throw new Error(`Section buttons require a 'tag' prop`)
      return button(h, this, () => this.toggleSection(this.tag))
    } else if (type === 'Link') {
      return button(h, this, () => this.toggleLink())
    } else if (type === 'Atom') {
      if (!this.name) throw new Error(`Atom buttons require a 'name' prop`)
      return button(h, this, () => this.addAtom(this.name))
    } else if (type === 'Card') {
      if (!this.name) throw new Error(`Card buttons require a 'name' prop`)
      return button(h, this, () => this.addCard(this.name))
    } else throw new Error(`The button ${type} does not exist`)
  }
}
