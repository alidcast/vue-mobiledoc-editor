# Vue Mobiledoc Editor

A Mobiledoc editor written using Vue and [Mobiledoc Kit](https://github.com/bustlelabs/mobiledoc-kit).

### Installation

```
npm install vue-mobiledoc-editor
```

The `vue-mobiledoc-editor` will install the `mobiledoc-kit` package as a dependency and load its assets.

### Basic Usage

This package is composed of two main components:

* `MobiledocEditor`
* `MobiledocButton`

Additionally, you can use the following addons:
* `MobiledocToolbar` (component)
* `compToCard` (factory function)


The most basic usage with an empty editor and a standard toolbar is:

```
// template
<Editor>
  <Toolbar />
</Editor>

// script
import Mobiledoc, { MobiledocToolbar } from "vue-mobiledoc-editor"

export default {
  components: {
    Editor: Mobiledoc.Editor,
    Toolbar: MobiledocToolbar
  }
}

```

You can check out the live `mobiledoc-kit` [demo](https://bustle.github.io/mobiledoc-kit/demo/) or clone the repo and run `npm run dev` for a more interactive example.

Read on for how to provide custom configurations to each component.

#### Mobiledoc Editor

The mobiledoc editor is a component that accepts these Mobiledoc-specific props:

* `mobiledoc`, a Mobiledoc to be edited. (*The package also exports an `EMPTY_MOBILEDOC` template that you can use as a default when passing a `mobiledoc` payload to the editor.*)

* `atoms`, an array of available atoms for use by the editor.

* `cards`, an array of available cards for use by the editor. (Jump to the section on Card-based components for details on how to create cards as Vue components.)

* `cardOptions`, an object of additional props to pass to rendered cards.

* `spellcheck`, a boolean. Defaults to true.

* `autofocus`, a boolean. Defaults to true.

* `placeholder`, a string to use as the placeholder text when the mobiledoc is blank.

* `serializeVersion`, a string representing the mobiledoc version to serialize to when firing the `postWasUpdated` action. Defaults to 0.3.0.

* 'enableEditing', a boolean that represents whether the editor is rendered in display or edit mode.

Additionally, it can emit the following events:

* `willCreateEditor`, a callback that fires when the Mobiledoc editor instance is about to be created. Takes no arguments.

* `didCreateEditor`, a callback that fires once the Mobiledoc editor instance has been created. Will be called with the editor instance and may be used to configure it further.

* `postWasUpdated`, a callback that will fire whenever the underlying document changes. It is called with the serialized mobiledoc.

(*Note: For placeholder and other mobiledoc-related styles to work, you must import/copy mobiledoc-kit's [default CSS](https://github.com/bustle/mobiledoc-kit/blob/master/src/css/mobiledoc-kit.css) file yourself.*)

Example usage:

```
<MobiledocEditor
  :placeholder="Start Writing..."
  @postWasUpdated="savePost">
</MobiledocEditor>
```


Using `provide/inject`, the Mobiledoc Editor also provides the `editorVm` to all child components. The `editorVM` has the following data and methods:

* `editor`, a function that returns the Mobiledoc editor instance itself

* `activeSectionTags`, an object with true values for section tag names in the current selection. For example activeSectionTagNames.isH1.

* `activeMarkupTags`, an object with true values for markup tag names in the current selection. For example activeMarkupTagNames.isStrong

* `canEdit`, a function that returns a boolean stating whether editing is currently enabled or disabled.

* `toggleMarkup`, toggles the passed markup tag name in the current selection.

* `toggleSection`, toggles the passed section tag name in the current selection.

* `toggleLink`, toggles the linking of a selection. The user will be prompted for a URL if required.

* `addAtom`, passed an atom `name`, `text`, and `payload`, will add that atom at the cursor position.

* `addCard`, passed a card `name`, `payload`, and `editMode` will add that card at the end of a post and render it in the specified mode initially.

* `toggleEditMode`, updates the `canEdit` state and toggles the edit mode of the mobiledoc editor.

You can use the `MobiledocEditor.editor` instance itself to take full advantage of the features in the [mobiledoc-kit API documentation](http://bustlelabs.github.io/mobiledoc-kit/demo/docs/).

Additionally, you can get the editor's actual post element by using `$refs`; the rendered post is referenced as `editorPost`.

#### Mobiledoc Button

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

#### Mobiledoc Toolbar

The component creates a standard toolbar for the mobiledoc editor.

Example usage:

```
<MobiledocToolbar />
```

### Advanced Usage

#### Component Cards

Mobiledoc supports "cards", blocks of rich content that are embedded into a post.

`vue-mobiledoc-editor` comes with a helper for using your own Vue components as the display and edit modes of a card.

The card's properties are passed as props to the component. You can use them like this:

```
// components/cards/example.vue

<template>
<div>
  <h1> {{ msg }} </h1>
</div>
</template>

<script>
export default {
  name='exCard'
  props: ['env'],
  data() {
    return {
      msg: this.env.isInEditor ? "You can edit me!" : "I'm immutable!"
    }
  }
}
</script>

```
Then, to use the component as a card, wrap your own component in the `compToCard`
serializer function, before passing it to the editor as a card option:

```
// components/editor.js
<template>
<div>
  <Editor :cards='cards'>
    <Btn type="card" name="exCard"> exCard </Btn>
  </Editor>
</div>
</template>

<script>
import Mobiledoc, { compToCard } from "vue-mobiledoc-editor"
import example from 'components/cards/example.vue'

export default {
  data () {
    cards: [
      compToCard(example)
    ],
    components: {
      Editor: Mobiledoc.Editor,
      Btn: Mobiledoc.Button
    }
  }
}
</script>
```

Please note that your card must have a name to identify it. So if your component does not have a name, you'll need to provide your own to the serializer function: `compToCard(NamelessComponent, 'MyCardName')`.

The following mobiledoc-specific properties are passed to the component:

- `env`, an object of that holds environment-specific properties
- `payload`, an object that holds the data payload retrieved from the mobiledoc for this card

For more details on the API for authoring cards in vanilla JavaScript, as welll as the `env` properties available to the card, see [CARDS.md](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md).

#### Creating custom mobiledoc components

To create components that control the mobiledoc editor, just inject the necessary data and methods, which the editor provides to all nested components.

For example, you can create a button that toggles whether the editor is editable or not:

```
export default {
  inject: ['canEdit', 'toggleEditMode']
  render(h) {
    return h(
      <button @click={ () => this.toggleEditMode() }>
        { this.canEdit ? 'Display' : 'Edit' }
      </button>
    )
  }
}
```

*Note: Mobiledoc components must be nested under the Mobiledoc `Editor`.*

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
