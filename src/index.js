(function () {
  let MobiledocController = require('MobiledocController').default,
      MobiledocEditor     = require('MobiledocEditor').default,
      MobiledocButton     = require('MobiledocButton').default,
      MobiledocToolbar    = require('addons/MobiledocToolbar').default
      
  function Mobiledoc() {
    function createMobiledoc(prefix='') {
      let sharedController = new MobiledocController()
      return {
        [`${prefix}MobiledocController`]: sharedController,
        [`${prefix}MobiledocEditor`]: MobiledocEditor(sharedController),
        [`${prefix}MobiledocButton`]: MobiledocButton(sharedController),
        [`${prefix}MobiledocToolbar`]: MobiledocToolbar(sharedController)
      }
    }

    return {
      // default mobiledoc instance
      ...createMobiledoc(),
      // function that can be used to create more than one mobiledoc instance
      createMobiledoc: createMobiledoc
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
