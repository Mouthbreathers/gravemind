# The Gravemind
## Purpose
This is a very high level and very opinionated set of guidelines for structuring your front end code.  Sometimes I'll give reasons for the way we're doing things, when those reasons matter.  Other times, the reason will be because we had to pick something.  In any case, our product will be better for it.  If, for some reason, one of these rules makes it very difficult for you to continue with a feature, please let me (Tom) know.  These are not written in stone, only in text on the internet.

### Git
* All work should be done on a branch, like `feature/new-feature`.  _**Why**: Keeping our work separate like this reduces merge conflicts and makes it easier to track work._
* Push often on your branch and be descriptive with your commit messages.

### Naming Conventions
* Use dashes in naming folders, files, and jade mixins.  For example: modules/article-hero/article-hero.jade or mixin mod-article-hero(hero)
* Prefix variables representing jQuery objects should begin with '$'
* Component and Module CSS should use BEM naming, where an _ denotes an element and a – denotes a modifier.  Use a single dash to separate words.  The block should be the name of the Module or Component.

### Components
* Use components if a pattern of markup will be used either in a loop or in multiple modules.  Do not create a new component for something that will not be rendered multiple times or on different views.  _**Why**: If a component is unique to a module and will not be rendered multiple times in it, it's simpler to include it in the module itself.  This will cut down on project size, build time, and it will keep related markup and css in one place._
* Prefix component mixins with cmpt-
* If a component does not require Javascript, don't include a js file.
* Expose component related Javascript as a jQuery plugin using the pattern found in /src/components/demo/demo.js
* For every option required, provide a default option in the defaultOptions function in the Javascript file.  _**Why**: Makes it easier and quicker to use the component and provides a fallback._
* Components may be included in other components

### Modules
* Modules are page-level and are the large building blocks of a view.  Modules do not have to be reused in another view or repeated.
* Modules should not be included in other modules.  _**Why**: To make our code easy to read, we will only pull chunks out of a module if those chunks are reused or looped.  These chunks are then components.  This cuts down on the number of files that you need to have open at once and makes it easier to find what you're looking for when developing._
* Prefix module mixins with mod-
* Use the provided controller pattern for creating Javascript for a module.  _**Why**: The controller pattern was created to help isolate Javascript to a module and to help control the initialization of a module.  It also provides a way to ensure that module code runs once on each instance of a module._
* If a module does not require Javascript, it does not need a controller.
* Always use the $module variable provided to the controller and the .find() method to identify DOM elements within a module.  For example: $element = $module.find('module_element');  _**Why**: When a module controller is initialized, it searches for all instances in the DOM of the module.  For each module, the controller is run once and the $module element represents that instance of the module.  Because of this, always using $module to find DOM elements ensures that each module has its Javascript applied only once._
* Modules are named by convention.  The module name (for example, module-name) should be a class on the module, a data-module="module-name" on the element and finally, name the element in the 'id' property of the module.  _**Why**: The Javascript matches the data-module attribute with the id property in the Javascript to find the module.  The css, because it's descriptive._

### Views
* Views are built entirely of Modules.  They should not have components directly in the .jade file and the only markup written in them should be a page level container and head tags.

### SCSS
* Use classes whenever possible to refer to elements.  _**Why**: It's easier to find what you're looking for and more descriptive for other developers._
* Try not to nest classes in classes when possible.  Nesting is ok for psuedo-elements, combinations of classes, and classes that get added, removed, or changed.  _**Why**: Reduces specificity needed to override scss and makes it easier to read.  For example:_
```scss
.module-name {
    &_inner {}
    &_element {
        &.open {}
    }
    &_another-element {
        &:after{}
    }
}
```

* When writing css rules for a class, include mixins at the top.  _**Why**: It looks nicer_
* Include the media mixin for media queries per class instead of once for each viewport.  _**Why**: Yes, this creates a slightly longer file, but there is value in keeping the css for each class in one place._
* When toggling classes, it's better to apply or remove one class to a higher level element than to multiple lower level elements.  _**Why**: Less javascript required to apply or remove classes, better synchronization between animations._

### Javascript
* Javascript for a module should only work within the module.  If you need to communicate across modules, use the publish / subscribe service on the global _z object.  Adding a class to the body is an expection to this.  _**Why**: Modules should be portable and should not rely on another module to function.  Obviously, there will always be a body element so that is permissible._
* Name functions for events.  _**Why**: It makes code more readable and allows us to debug more easily._

```javascript
$openButton.click(handleOpenClick);

function handleOpenClick(event){
    enel.publish('sideMenu.toggleState');
}
```

* Remove console.logs before pushing.  _**Why**: console.logs can break certain IE versions._