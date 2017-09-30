import Vue from "vue"
import MobiledocController from "src/MobiledocController"
import MobiledocEditor from "src/MobiledocEditor"
import MobiledocButton from "src/MobiledocButton"

const { spy } = sinon

describe("<MobiledocButton />", function () {
  const ctrl = new MobiledocController()
  const Btn = Vue.extend(MobiledocButton(ctrl))

  it("markup button receives necessary props", () => {
    let markupProps  =  { type: "markup",  tag: "strong" }
    let btn = new Btn({ propsData: markupProps })
    expect(btn.type).to.equal("markup")
    expect(btn.tag).to.equal("strong")
  })

  it("section button receives necessary props", () => {
    let sectionProps =  { type: "section", tag: "h1" }
    let btn = new Btn({ propsData: sectionProps })
    expect(btn.type).to.equal("section")
    expect(btn.tag).to.equal("h1")
  })

  it("link button receives necessary props", () => {
    let linkProps    =  { type: "markup",  tag: "a" }
    let btn = new Btn({ propsData: linkProps })
    expect(btn.type).to.equal("markup")
    expect(btn.tag).to.equal("a")
    // TODO prompt
  })

  it("atom button receives necessary props", () => {
    let atomProps    =  { name: "mention",  text: "@hello" }
    let btn = new Btn({ propsData: atomProps })
    expect(btn.name).to.equal("mention")
    expect(btn.text).to.equal("@hello")
    // TODO payload
  })

  it("card button receives necessary props", () => {
    let atomProps    =  { name: "image",  mode: "display" }
    let btn = new Btn({ propsData: atomProps })
    expect(btn.name).to.equal("image")
    expect(btn.mode).to.equal("display")
    // TODO
    // payload, cardOptions
  })
})
