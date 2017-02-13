(function () {
  let MobiledocController = require('MobiledocController').default,
      MobiledocEditor     = require('MobiledocEditor').default,
      MobiledocButton     = require('MobiledocButton').default,
      MobiledocToolbar    = require('addons/MobiledocToolbar').default

  function Mobiledoc() {
    const Mobiledoc = {}
    Mobiledoc.controller = new MobiledocController()

    return {
      // default mobiledoc instance
      MobiledocController: Mobiledoc.controller,
      MobiledocEditor: MobiledocEditor(Mobiledoc.controller),
      MobiledocButton: MobiledocButton(Mobiledoc.controller),
      MobiledocToolbar: MobiledocToolbar(Mobiledoc.controller),
      // object that can be used to create more than one mobiledoc instance 
      Mobiledoc: {
        controller: MobiledocController,
        editor: MobiledocEditor,
        button: MobiledocButton,
        toolbar: MobiledocToolbar
      }
    }
  }

  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = Mobiledoc()
  } else if (typeof define === 'function' && define.amd) {
    define(function () { return Mobiledoc() })
  } else if (typeof window !== 'undefined') {
    window.Mobiledoc = Mobiledoc()
  }
})()
