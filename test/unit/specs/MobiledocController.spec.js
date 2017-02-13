import Vue from "vue"
import MobiledocController from "src/MobiledocController"
import MobiledocEditor from "src/MobiledocEditor"
import MobiledocButton from "src/MobiledocButton"

const { spy } = sinon

describe("MobiledocController", function () {
  const ctrl = new MobiledocController()
  const vm = new Vue(MobiledocEditor(ctrl))

  it("should update controller data with new editor instance", (done) => {
    expect(ctrl.editor).to.be.empty
    vm.$mount()
    Vue.nextTick(() => {
      expect(ctrl.editor.mobiledoc.version).to.equal('0.3.0')
      done()
    })
  })

  // TODO finish these tests, they're being stubborn
  //

  // it("should update activeMarkupTags data", (done) => {
  //   expect(ctrl.activeMarkupTags).to.be.empty
  //   vm.$mount()
  //   Vue.nextTick(() => {
  //     ctrl.editor.toggleMarkup('strong')
  //     ctrl.editor.insertText('Strong Text')
  //     expect(ctrl.activeMarkupTags).to.equal(['strong'])
  //     console.log(ctrl.activeMarkupTags)
  //     done()
  //   })
  // })
  //
  // it("should update activeSectionTags data", (done) => {
  //   expect(ctrl.activeSectionsTags).to.be.empty
  //   vm.$mount()
  //   Vue.nextTick(() => {
  //     // ctrl.editor.toggleSection('h1')
  //     // ctrl.editor.insertText('A Heading')
  //     done()
  //   })
  // })
  //
  // it("fires InputModeChanged when markup or section changed", (done) => {
  //   Vue.nextTick(() => {
  //     done()
  //   })
  // })
})
