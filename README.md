# Vue Mobiledoc Editor

A Mobiledoc editor written using Vue and [Mobiledoc Kit](https://github.com/bustlelabs/mobiledoc-kit).

### Installation

```
npm install vue-mobiledoc-editor
```

The `vue-mobiledoc-editor` will install the `mobiledoc-kit` package as a dependency and load its assets.

### Basic Usage

This package is composed of three main parts:

* `MobiledocEditor`
* `MobiledocButton`
* `MobiledocController`

Additionally, you can use the following addons:
* `MobiledocToolbar`

The `MobiledocEditor`, `MobiledocButton`, and `MobiledocToolbar` are Vue components that all share the `MobiledocController` instance, which allows each of the mobiledoc components to share data and methods and communicate with each other.

You can import the default `Mobiledoc` instance, which has this all initialized.
* `Mobiledoc.Ctrl`
* `Mobiledoc.Editor`
* `Mobiledoc.Btn`
* `Mobiledoc.Toolbar`

The most basic usage with an empty editor and a standard toolbar is:

```
// template
<MobiledocEditor>
  <MobiledocToolbar />
</MobiledocEditor>

// script
import Mobiledoc from "vue-mobiledoc-editor"

export default {
  components: {
    Editor: Mobiledoc.Editor,
    Toolbar: Mobiledoc.Toolbar
  }
}

```

You can check out the live `mobiledoc-kit` [demo](https://bustle.github.io/mobiledoc-kit/demo/) or clone the repo and run `npm run dev` for a more interactive example.

Read on for how to provide custom configurations to each component.

#### `<MobiledocEditor>`

The mobiledoc editor is a component that accepts these Mobiledoc-specific props:

* `mobiledoc`, a Mobiledoc to be edited.

* `cards`, an array of available cards for use by the editor. (Jump to the section on Card-based components for details on how to create cards as Vue components.)

* `atoms`, an array of available atoms for use by the editor.

* `spellcheck`, a boolean. Defaults to true.

* `autofocus`, a boolean. Defaults to true.

* `placeholder`, a string to use as the placeholder text when the mobiledoc is blank.

* `serializeVersion`, a string representing the mobiledoc version to serialize to when firing the `postWasUpdated` action. Defaults to 0.3.0.

* 'enableEditing', a boolean that represents whether the editor is rendered in display or edit mode initially.

Additionally, it can emit the following events:

* `willCreateEditor`, a callback that fires when the Mobiledoc editor instance is about to be created. Takes no arguments.

* `didCreateEditor`, a callback that fires once the Mobiledoc editor instance has been created. Will be called with the editor instance and may be used to configure it further.

* `postWasUpdated`, a callback that will fire whenever the underlying document changes. It is called with the serialized mobiledoc.

Example usage:

```
<MobiledocEditor
  :placeholder="Start Writing..."
  @postWasUpdated="savePost">
</MobiledocEditor>
```

#### `<MobiledocButton>`

The `MobiledocButton` is a functional component that delegates the passed `props` to the appropriate button. Because of this, *every button requires* the `type` prop. Any additional props depend on the type of button.

There are five types of buttons:

* `MarkupButton`, requires a `tag` prop to identify the type of markup to toggle.

* `SectionButton`, requires a `tag` prop to identify the type of section to toggle.

* `LinkButton`, accepts an optional `prompt` prop that you can pass if you wish to provide a custom dialog that the user will shown when prompted input the link.

* `AtomButton`, requires a `name` prop to identify the atom that will be added to the end of the post and accepts an optional `text` and `payload` prop.

* `CardButton`, requires a `name` prop to identify the card that will be added to the end of the post and accepts an optional `payload` and `mode` prop. There are two `mode` options, `edit` or `display`; the default is `display`.

Additionally, all buttons accept a`label` prop, to set the content of the button when used as a blockless component.

Example usage:

```
<MobiledocButton label="bold" type="markup" tag="strong" />
```

#### `<MobiledocToolbar>`

The component creates a standard toolbar for the mobiledoc editor.

Example usage:

```
<MobiledocEditor />
```

#### `MobiledocController`

The mobiledoc controller is a Vue instance that you can use to inspect the state of the editor or to share the editor's data and methods between components.

The controller exposes the following `data`, which is set by the `MobiledocEditor`:

* `editor`, the Mobiledoc editor instance itself

* `activeSectionTags`, an object with true values for section tag names in the current selection. For example activeSectionTagNames.isH1.

* `activeMarkupTags`, an object with true values for markup tag names in the current selection. For example activeMarkupTagNames.isStrong

* `canEdit`, a boolean that represents the editing is currently enabled or disabled.

It also exposes the following `methods`, which are used by the `MobiledocButton`:

* `toggleMarkup`, toggles the passed markup tag name in the current selection.

* `toggleSection`, toggles the passed section tag name in the current selection.

* `toggleLink`, toggles the linking of a selection. The user will be prompted for a URL if required.

* `addAtom`, passed an atom `name`, `text`, and `payload`, will add that atom at the cursor position.

* `addCard`, passed a card `name`, `payload`, and `editMode` will add that card at the end of a post and render it in the specified mode initially.

* `toggleEditMode`, updates the `canEdit` state and toggles the edit mode of the mobiledoc editor.

You can use the `MobiledoController.editor` instance itself to take full advantage of the features in the [mobiledoc-kit API documentation](http://bustlelabs.github.io/mobiledoc-kit/demo/docs/).

### Advanced Usage

#### Component Cards

Mobiledoc supports "cards", blocks of rich content that are embedded into a post. For more details on the API for authoring cards in vanilla JavaScript, see [CARDS.md](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md).

*In the future, `vue-mobiledoc-editor` will support the creation of mobiledoc cards as vue components.*


#### Creating custom mobiledoc components

To create your own components to be used with the mobiledoc editor, just export the component as a function that takes in a mobiledoc controller instance.

For example, you can create a button that toggles whether the editor is editable or not:

```
// we export the component as a function so that we can pass
// it the appropriate `MobiledocController` instance
export default (ctrl) => ({
  render(h) {
    return h(
      <button @click={ () => ctrl.toggleEditMode() }>
        { ctrl.canEdit ? 'Display' : 'Edit' }
      </button>
    )
  }
})
```

Then, if we wanted to use the component with the default mobiledoc editor instance:

```
import Mobiledoc from 'vue-mobiledoc-editor'
import MobiledocToggler from '~components/MobiledocToggler.vue'

export default {
    components: {
      Editor: Mobiledoc.Editor,
      Toggler: MobiledocToggler(Mobiledoc.Ctrl)
    }
}
```

#### Using more than one mobiledoc instance

If you want to create more than one mobiledoc instance, just import the `createMobiledoc` function instead of the default component instances.

The `createMobiledoc` function creates a set of mobiledoc components. The exported object has the following properties: a `MobiledocEditor`, `MobiledocButton`, `MobiledocToolbar`, and the shared `MobiledocController` instance.

Furthermore, you can pass the `createMobiledoc` function a `prefix` param to facilitate naming of the object's properties incase you want to grab the components through destructuring syntax.

```
// template
<FirstMobiledocEditor  placeholder="write here" />
<SecondMobiledocEditor placeholder="or here" />

// script
import { createMobiledoc } from 'vue-mobiledoc-editor'

// use destructuring syntax to grab the components you want to use
const { FirstEditor } = createMobiledoc('First')
const { SecondEditor } = createMobiledoc('Second')

export default {
  components: {
    FirstEditor,
    SecondEditor
  }
}
```

## Development

To get started:

* `git clone` this repository

* `npm install`


Run the development server:

A development server is available under the `/demo` directory. You can check out the demo for an example of basic usage or to interactively test your contribution.

* `npm run dev` from project root

*  Visit your app at `http://localhost:8080`.


Run tests:

* `npm run unit`


Build to `dist/`:

* `npm run build`


#### Getting Help

If you'd like to report a bug or request a feature, please [open an issue](https://github.com/studbits/vue-mobiledoc-editor/issues).
