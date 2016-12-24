import Vue from 'vue'
import titlelize, { capitalize } from "./utils/titlelize"

// TODO
// function isActive(ctx, ctrl) {
//   let type = titlelize(ctx.props.type)
//   if (type != 'Markup' && type != 'Section') return false
//   let activeTags = `${ctrl}.active${type}Tags`
//   return activeTags.indexOf(ctx.props.tag) > 1
// }

function createButton(h, ctx, clickAction) {
  return (
    <button
      class="mobiledoc-button"
      id={ `mobiledoc-${ctx.props.type}-button` }
      onClick={ clickAction }>
        { ctx.props.label }
        { ctx.slots().default }
    </button>
  )
}

const MarkupButton = (ctx, ctrl) => ({
  props: {
    type:  { type: String, required: true },
    tag:   { type: String, required: true },
    label: { type: String }
  },

  render: h => createButton(h, ctx, () => ctrl.toggleMarkup(ctx.props.tag))
})

const SectionButton = (ctx, ctrl) => ({
  props: {
    type:  { type: String, required: true },
    tag:   { type: String, required: true },
    label: { type: String }
  },

  render: h => createButton(h, ctx, () => ctrl.toggleSection(ctx.props.tag))
})

// TODO accept custom prompt

const LinkButton = (ctx, ctrl) => ({
  props: {
    // link input is a special type of 'markup', so we expose is as type="Link"
    type:    { type: String, required: true },
    prompt:  { type: Object },
    label:   { type: String }
  },

  render: h => createButton(h, ctx, () => ctrl.toggleLink())
})

//
// TODO accept custom atom and card params
//

const AtomButton = (ctx, ctrl) => ({
  props: {
    type:    { type: String, required: true },
    name:    { type: String, required: true },
    text:    { type: String },
    payload: { type: Object },
    label:   { type: String }
  },

  render: h => createButton(h, ctx, () => ctrl.addAtom(ctx.props.name))
})

const CardButton = (ctx, ctrl) => ({
  props: {
    type:    { type: String, required: true },
    name:    { type: String, required: true },
    payload: { type: Object },
    mode:    { type: String },
    label:   { type: String }
  },

  render: h => createButton(h, ctx, () => ctrl.addCard(ctx.props.name))
})

// TODO add error check if component not pass Vue instance
const ButtonWrapper = (ctrl) => ({
  functional: true,

  props: ['type', 'label', 'tag', 'prompt',
          'name', 'text', 'payload', 'mode'],

  render(h, ctx) {
    ctx.data.props = ctx.props // pass props to children
    return h(
      (() => { // delegate to appropriate button component
        let btn = titlelize(ctx.props.type)
        if      (btn === 'Markup')       return MarkupButton(ctx, ctrl)
        else if (btn === 'Section')      return SectionButton(ctx, ctrl)
        else if (btn === 'Link')         return LinkButton(ctx, ctrl)
        else if (btn === 'Atom')         return AtomButton(ctx, ctrl)
        else if (btn === 'Card')         return CardButton(ctx, ctrl)
        else throw new Error(`The type ${btn} does not exist`)
      })(),
      ctx.data,
      ctx.children
    )
  }
})

export default (ctrl) => {
  if (ctrl instanceof Vue !== true) {
    throw new Error('You did not pass Mobiledoc Controller to Mobiledoc Button')
  }
  return ButtonWrapper(ctrl)
}
