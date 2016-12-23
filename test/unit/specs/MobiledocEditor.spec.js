import Vue from "vue"
import MobiledocEditor from "src/MobiledocEditor"
import MobiledocController from "src/MobiledocController"

const { spy } = sinon

describe("<MobiledocEditor />", function () {
  const ctrl = new MobiledocController()
  const editor = new Vue(MobiledocEditor(ctrl))

  it("all props that serve as editor options have defaults", () => {
    expect(editor.autofocus).to.not.be.undefined
    expect(editor.placeholder).to.not.be.undefined
    expect(editor.spellCheck).to.not.be.undefined
    expect(editor.serializeVersion).to.not.be.undefined
    expect(editor.atoms).to.not.be.undefined
    expect(editor.cards).to.not.be.undefined
    expect(editor.mobiledoc).to.not.be.undefined
  })

  it("fires willCreateEditor callback", (done) => {
    let callback = spy()
    editor.$on("willCreateEditor", callback)
    editor.$mount()
    Vue.nextTick(() => {
      expect(callback).to.have.been.called
      done()
    })
  })

  it("fires didCreateEditor callback with editor instance", (done) => {
    let callback = spy()
    editor.$on("didCreateEditor", callback)
    editor.$mount()
    editor.$nextTick(() => {
      expect(callback).to.have.been.calledWith(ctrl.editor)
      done()
    })
  })

  it("fires willCreateEditor before didCreateEditor callback", (done) => {
    let callbackFirst = spy()
    let callbackSecond = spy()
    editor.$on("didCreateEditor", callbackFirst)
    editor.$on("didCreateEditor", callbackSecond)
    editor.$mount()
    editor.$nextTick(() => {
      expect(callbackFirst).to.have.been.calledBefore(callbackSecond)
      done()
    })
  })

  it("fires postWasUpdated callback with mobiledoc", (done) => {
    let callback = spy()
    editor.$on("postWasUpdated", callback)
    editor.$mount()
    editor.$nextTick(() => {
      ctrl.editor.run(postEditor => {
        const changeMade = postEditor.builder.createMarkupSection("p")
        postEditor.insertSection(changeMade)
      })
      expect(callback).to.have.been.calledWithMatch({ version: "0.3.0" })
      done()
    })
  })
})
