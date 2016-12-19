import Vue from "vue"
import MobiledocButton from "src/MobiledocButton.vue"

const { spy } = sinon
const Component = Vue.extend(MobiledocButton)

const markupProps = { type: "markup", for: "strong" }
const sectionProps = { type: "section", for: "h1" }
const linkProps = { type: "markup", for: "a" }

describe("<MobiledocButton />", function () {
  it("receives arbritary values of required props", () => {
    let vm = new Component({ propsData: markupProps })
    expect(vm.type).to.equal("markup")
    expect(vm.for).to.be.equal("strong")
  })

  it("should toggle markup and pass appropriate tag", (done) => {
    let vm = new Component({ propsData: markupProps })
    let callback = spy()
    vm.$on("toggleMarkup", callback)
    vm.toggle()
    Vue.nextTick(() => {
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith("Strong")
      done()
    })
  })

  it("should toggle section and pass appropriate tag", (done) => {
    let vm = new Component({ propsData: sectionProps })
    let callback = spy()
    vm.$on("toggleSection", callback)
    vm.toggle()
    Vue.nextTick(() => {
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith("H1")
      done()
    })
  })

  it("should toggle link and pass 'a' tag", (done) => {
    let vm = new Component({ propsData: linkProps })
    let callback = spy()
    vm.$on("toggleLink", callback)
    vm.toggle()
    Vue.nextTick(() => {
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith("a")
      done()
    })
  })

  // TODO e2e should set active Tag
})
