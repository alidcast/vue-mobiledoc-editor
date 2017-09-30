import Vue from 'vue'

function renderCard (comp, isEditing = false) {
  const CompCard = Vue.extend(comp)

  return function createCard ({ env, options, payload }) {
    const targetNode = document.createElement('div')

    let cardVm
    env.didRender(() => {
      payload = { ...payload } // copy payload

      const propsData = { env, payload, options, isEditing }

      cardVm = new CompCard({ propsData }).$mount()
      targetNode.appendChild(cardVm.$el)
    })

    env.onTeardown(() => {
      // target node is auto destroyed; we only need to clean up comp instance
      cardVm.$destroy()
    })

    return targetNode
  }
}

export default function compToCard (component, name) {
  if (!name && typeof component.name === 'undefined') {
    throw new Error("Can't create card, no name defined: " + component)
  }

  return {
    name: name || component.name,
    type: 'dom',
    component,
    render: renderCard(component),
    edit: renderCard(component, true)
  }
}
