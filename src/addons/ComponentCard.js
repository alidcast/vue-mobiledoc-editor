// import Vue from 'vue'
// import MobiledocEditor from "../MobiledocEditor"

function createCard (component) {
  const el = component.render()
  // TODO create components in JSX and append them to target node in DOM
  return () => el
}

export default class {
  constructor (name, component, { type = 'dom' } = {}) {
    if (!name && typeof component.name === undefined) {
      throw new Error(`Can't create card from component, no card name defined: ${component}`)
    }

    this.name = name || component.name
    this.component = component
    this.type = type
    this.render = createCard(component)
    this.edit = createCard(component)
  }
}
