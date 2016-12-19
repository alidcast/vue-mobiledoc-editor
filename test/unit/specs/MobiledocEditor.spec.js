import Vue from "vue"
import MobiledocEditor from "src/MobiledocEditor.vue"

const { spy } = sinon

describe("<MobiledocEditor />", function () {
  let vm

  beforeEach(() => {
    const Component = Vue.extend(MobiledocEditor)
    vm = new Component()
  })

  it("all of the props that are editor options should have defaults", () => {
    expect(vm.autofocus).to.not.be.undefined
    expect(vm.placeholder).to.not.be.undefined
    expect(vm.spellCheck).to.not.be.undefined
    expect(vm.serializeVersion).to.not.be.undefined
    expect(vm.atoms).to.not.be.undefined
    expect(vm.cards).to.not.be.undefined
    expect(vm.mobiledoc).to.not.be.undefined
  })

  it("fires willCreateEditor callback", (done) => {
    let callback = spy()
    vm.$on("willCreateEditor", callback)
    vm.$mount()
    Vue.nextTick(() => {
      expect(callback).to.have.been.called
      done()
    })
  })

  it("fires didCreateEditor callback with editor instance", (done) => {
    let callback = spy()
    vm.$on("didCreateEditor", callback)
    vm.$mount()
    vm.$nextTick(() => {
      expect(callback).to.have.been.calledWith(vm.editor)
      done()
    })
  })

  it("fires willCreateEditor before didCreateEditor callback", (done) => {
    let callbackFirst = spy()
    let callbackSecond = spy()
    vm.$on("didCreateEditor", callbackFirst)
    vm.$on("didCreateEditor", callbackSecond)
    vm.$mount()
    vm.$nextTick(() => {
      expect(callbackFirst).to.have.been.calledBefore(callbackSecond)
      done()
    })
  })

  it("fires onChange callback with mobildoc, e.g., with serialize version", (done) => {
    let callback = spy()
    vm.$on("onChange", callback)
    vm.$mount()
    vm.$nextTick(() => {
      vm.editor.run(postEditor => {
        const changeMade = postEditor.builder.createMarkupSection("p")
        postEditor.insertSection(changeMade)
      })
      expect(callback).to.have.been.calledWithMatch({ version: "0.3.0" })
      done()
    })
  })
})
