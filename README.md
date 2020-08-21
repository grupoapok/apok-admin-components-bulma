# Apok-admin-components-bulma
### **The Bulma Styled Components for Apok-admin vue plugin**

## Table of Contents
- [Installation](#installation)
- [Renderers](#renderers)
- [Input Mixin](#input-mixin)
- [Components](#components)
    - [Inputs](#inputs)
    - [Layout](#layout)
    - [Form](#form)
    - [Miscellaneous](#miscellaneous)

## Installation

When [installing Apok-admin VueJS plugin](https://github.com/grupoapok/apok-admin/blob/master/README.md#installation),
you'll have to choose the CSS styled components. This project contains the Bulma
version of the aforementioned components. You really should not install this
package directly into your Vue app, unless you are developing this project too.
Most of the times, you want to get this package from the [Apok-admin installation](https://github.com/grupoapok/apok-admin/blob/master/README.md#installation)
guide describe in its docs.

## Renderers

For renderers information make sure to check the [Apok-admin's Renderers documentation](https://github.com/grupoapok/apok-admin/tree/develop#renderers).
The only detail that's not yet
explained on the aforementioned docs are the properties passed to the renderer. Since a renderer is the alias used for
the component, ***all properties passed to a renderer are equivalent to pass them to the component itself!***. By this
we mean that you can set properties to a renderer the same way to a component, thus making a renderer tag behave exactly
like the component tag. It's a fact that the renderer concept might seem redundant, however, it allows you to keep the same
html tag on the whole app, while using variations on the same component or even change it completely.

Here's an example of a Button component being called by its renderer tag equivalent and making use of it just as the
component itself:

```vue
<!-- On a Vue component template -->
<template>
<!-- Passing props the same as in the IconButton.vue component-->
    <button-renderer icon="plus" type="is-success">
        Add to cart
    </button-renderer>
</template>
```

The same logic applies to al renderers listed [here](https://github.com/grupoapok/apok-admin/tree/develop#renderers)

## Input Mixin

All inputs on this package include a InputMixin.js mixin that covers most of the properties that input components may need.
This mixin has the ``inheritAttrs`` attribute set to false, which does exactly
[that](https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance).
Here's a list on the props included on this mixin:

Name | Description | Type | Default|
|:---|:---|:---:|:---:|
| ``inline`` | Inline alignment on component | Boolean | false |
| ``readonly`` | Sets readonly state | Boolean | false |
| ``loading`` | Sets loading state | Boolean | false |
| ``type`` | Input type | String | 'text' |
| ``label`` | Input label | String | null |
| ``id`` | Input ID | String | null |
| ``value`` | Input field value | Any | null |
| ``error`` | Error message on field | String | null |
| ``placeholder`` | Input field placeholder | String | null |

Also there's a function called ``emit`` that emits an event on input change and has the
input value as hte payload.

## Components

This package includes a set of VueJS components for your project development. Each component have
their own props and logic so you can work with them as you wish. Here's a list of every component
and props. All components are made with [Bulma](https://bulma.io/documentation/) + [Buefy](https://buefy.org/documentation/),
so make sure to check the docs for more info about it.

- ### Inputs

    #### InputFormCalendar.vue

    Under the hood, this component uses [date-fns](https://date-fns.org/docs/Getting-Started)
    for [format](https://date-fns.org/v2.15.0/docs/format) and [parse](https://date-fns.org/v2.15.0/docs/parse)
    functions. Make sure to check the docs for additional info!

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``readonly`` | Changes readonly state of component | Boolean | false |
        | ``value`` | The picked date | String, Date | new Date() |
        | ``format`` | Display format for picked date | String | 'dd/MM/yyyy' |
        | ``parseFormat`` | Parsing format | String | 'yyyy-MM-dd' |

    #### InputFormCheck.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``color`` | Input color style | String | 'is-info' |
        | ``options`` | Options to choose from | Array | [{label: 'Default', value: False}] |

    #### InputFormFile.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``buttonText`` | Sets the upload button label | String | 'Choose a file...' |
        | ``fileIcon`` | Sets the upload icon | String, Object | 'upload' |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``input`` | Triggers when file has been selected | chosen file |

    #### InputFormMultiSelect.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``value`` | Array of selected options' value | Array | - |
        | ``options`` | Array of options | Array | - |
        | ``readonly`` | Sets read only status on input | Boolean | false |
        | ``placeholder`` | Placeholder label on input | String | 'Select options...' |
        | ``state`` | Error state | String | null |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``input`` | Triggers when a option has been selected | Array of selected options |

    #### InputFormRadio.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``options`` | Array of options | Array | [{label: 'Default, value: false}] |

    #### InputFormSelect.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``options`` | Array of options | Array | - |

    #### InputFormText.vue

    The properties and events linked to this component are those already existing the
    InputMixin.js file. For a better explanation about this, check the [Input Mixin](input-mixin)
    section of this docs and [Vue Mixins](https://vuejs.org/v2/guide/mixins.html#Basics) on VueJS official docs

    #### InputFormTimePicker.vue

    Similar to InputFormCalendar, this components uses the [format](https://date-fns.org/v2.15.0/docs/format) function
    of date-fns library. Make sure to check it!

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``hoursLabel`` | Label for hours display | String | 'Hours' |
        | ``minutesLabel`` | Label for minutes display | String | 'Minutes' |
        | ``secondsLabel`` | Label for seconds display | String | 'Seconds |
        | ``readonly`` | Sets read only state on input | Boolean | false |
        | ``state`` | Error state | String | null |
        | ``buttonsVariant`` | Variant of buttons' color | String | 'is-info' |
        | ``hoursInterval`` | Increment / Decrement interval for hours | Number | 1 |
        | ``minutesInterval`` | Increment / Decrement interval for minutes | Number | 1 |
        | ``secondsInterval`` | Increment / Decrement interval for seconds | Number | 1 |
        | ``value`` | Chosen time | String | null |
        | ``format`` | Time format | String | 'HH:mm' |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``input`` | Emits an event when input is made | event |
        | ``selected-time`` | Emits and event with the current time | displayed time |

- ### Layout

    #### Layout.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``menu`` | Array of labels and links for the sidebar menu | Array | - |
        | ``messages`` | UI array of messages | Array | - |
        | ``user`` | Logged in user's data | Object | - |
        | ``sidebarExpanded`` | sidebar expansion flag | Boolean | - |
        | ``title`` | Displayed name on desktop viewport | String | 'Admin' |
        | ``shortTitle`` | Displayed name on mobile viewport | String | 'A' |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``messageDismissed`` | Triggered on message close event | message id |
        | ``toggle-sidebar`` | Triggered on sidebar expansion | - |
        | ``logout-confimed`` | Triggered when 'ok' button is clicked on logout | - |

    #### LayoutNavbar.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``user`` | User's data object | Object | - |
        | ``expanded`` | Expansion state of navbar | Boolean | - |
        | ``canToggleSidebar`` | Whether or not can be toggled the sidebar | Boolean | true |
        | ``title`` | Navigation bar name on desktop viewport | String | - |
        | ``shortTitle`` | Navigation bar name on mobile viewport | String | - |
        | ``locales`` | Available translation for your page  | Array | - |
        | ``color`` | Navigation bar color | String | 'light' |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``toggle-sidebar`` | Triggered on sidebar expansion | - |
        | ``logout`` | Triggered when logout option is clicked | - |

    #### LayoutFooter.vue

    This component does not make use of, instead, it uses a [slot](https://es.vuejs.org/v2/guide/components-slots.html)
    that can be changed to any content you want. So, as long as you footer content is inside of
    a footer renderer tag, your content will always behave as expected. For example:

    ```xhtml
      <layout-footer-renderer>
          <div class="myClass"> <h2> My header </h2>< /div>
      </layout-footer-renderer>
    ```

    #### LayoutMenu.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``items`` | Menu items to render | Array | - |
        | ``expanded`` | Whether or not the menu is expanded | Boolean | true |

    #### LayoutMenuItem.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``label`` | Menu item label | String | - |
        | ``to`` | Router link | Object, String | - |
        | ``icon`` | Item icon | Object, String | - |
        | ``children`` | Array of children items of current parent item | Array | - |
        | ``mini`` | Whether or not should be renderer the miniature version of the item | Boolean | - |

    #### Dashboard.vue

    This components uses slots to render a sort of grid defined by rows and columns. Each "tile" will
    be the space taken by the specified slot where your content will render:

    ```xhtml
      <dashboard-renderer rows="1" columns="2">
          <template v-slot:tile_1_1>
              <p>Here's some content for the tile intersected between row 1 and column 1</p>
          </template>
          <template v-slot:tile_1_2>
              <p>And another one on the tile intersected between row 1 and column 2</p>
          </template>
      </dashboard-renderer>
    ```

    You can add as many tiles as your grid allows. However, tiles that dont exist in the current
    grid wont be rendered at all since the slot for that tile doesn't exist.

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``rows`` | Amount of rows in grid | Number | 0 |
        | ``columns`` | Amount of columns on each row | Number | 0 |
        | ``isMultiline`` | Apply 'is-multiline' Bulma class to all rows | Boolean | true |
        | ``sample`` | Render sample content in dashboard | Boolean | false |

- ### Form

    #### AdminForm.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``formVar`` | Stores content for every field in form | Object | - |
        | ``fields`` | Array of fields to render on form | Array | - |
        | ``errors`` | Stores errors associated to a field | Object | - |
        | ``readonly`` | Sets read only state on form field | Boolean | - |
        | ``loading`` | Sets loading state on form field | Boolean | false |
        | ``showDivider`` | Render a divider between fields and buttons | Boolean | true |
        | ``buttonsAlignment`` | Alignment of buttons | String | 'left' |
        | ``submitButtonText`` | Label on submit button | String | 'actions.save' |
        | ``submitButtonVariant`` | Color variant of submit button | String | 'is-primary' |
        | ``submitButtonIcon`` | Icon of the submit button | Object | { icon: 'check' } |
        | ``cancelButtonText`` | Label on cancel button | String | 'actions.cancel' |
        | ``cancelButtonVariant`` | Color variant of cancel button | String | null |
        | ``cancelButtonIcon`` | Icon of the cancel button | Object | { icon: 'angle-left' } |
        | ``backButtonText`` | Label on back button | String | 'actions.goBack' |
        | ``backButtonVariant`` | Color variant of back button | String | 'is-info' |
        | ``backButtonIcon`` | Icon of the back button | Object | { icon: 'angle-left' } |
        | ``showCancel`` | Show cancel button | Boolean | true |
        | ``showSubmit`` | Show submit button | Boolean | true |
        | ``showBack`` | Show back button | Boolean | true |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``fieldChanged`` | Triggered on field's input event | - |
        | ``cancel`` | On cancel of back button click | - |
        | ``submit`` | When submit button is clicked | - |

    #### AdminFormField.vue

    - #### Properties

        This components also uses the [Input Mixin](#input-mixin).

        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``append`` | Appended addon of field | Array | - |
        | ``prepend`` | Prepended addon of field | Array | - |
        | ``help`` | Help text | String | - |

    #### IconButton.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``iconOnly`` | Only show an icon on the button | Boolean | false |
        | ``right`` | Add an icon to the right | Boolean | - |
        | ``icon`` | Icon of choice | Object, String | null |

- ### Miscellaneous

    #### Icon.vue

    This component wraps around the font-awesome-icon and unicon components. If any of those icon packs are chosen
    then the Icon component will render any of those depending on the passed properties. For mdi, a simple
    ``<i>`` tag es render with the correct classes to display the icons.

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``unicons`` | Set true if you want to use (and have installed) unicons icon pack | Boolean | false |
        | ``material`` | Use material icons | Boolean | false |
        | ``mdi`` | Use Material Design Icons | Boolean | false |
        | ``iconStyle`` | Sets the icon style | String | 'line' |
        | ``icon`` | Icon's name | String, Array | null |
        | ``spin`` | Set spinning state if available | Boolean | false |
        | ``outlined`` | Sets outlined style of icon (material, mdi) | Boolean | false |

    #### AdminTable.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``items`` | Table items | Array | - |
        | ``idField`` | Name of ID column | String | 'id' |
        | ``loading`` | Table loading state | Boolean | false |
        | ``hover`` | Make hoverable rows | Boolean | false |
        | ``emptyIcon`` | Icon shown when table is empty | String | null |
        | ``emptyMessage`` | Message shown when table is empty | String | 'Nothing to show...' |
        | ``allowPagination`` | Show pagination | Boolean | false |
        | ``totalPages`` | Total amount of pages on whole list | Number | 1 |
        | ``currentPage`` | Current displayed page | Number | 1 |
        | ``canCreate`` | Show create button | Boolean | true |
        | ``canReload`` | Show reload button | Boolean | true |
        | ``canChangePageSize`` | Allows page sizing | Boolean | true |
        | ``createButtonText`` | Create button label | String | new |
        | ``createButtonProps`` | Sets the create button type and icon | Object | { type: 'is-success', icon: 'plus'} |
        | ``fields`` | Table columns | Array | - |
        | ``actions`` | Allowed actions on each row | Array | - |
        | ``sortFields`` | Column used to sort rows | String | null |
        | ``sortDirection`` | Sorting order | String | 'asc' |
        | ``filters`` | Content used for filtering | Object | - |
        | ``filtersFields`` | Columns used for filtering | Array | - |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``refresh`` | Triggered when refresh button is clicked | - |
        | ``pageChanged`` | Triggered when page is changed on pagination | event |

    #### Pagination.vue

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``pageSizes`` | Permitted page sizes | Array | [1, 5, 10, 15, 20, 25, 50, 100] |
        | ``currentPage`` | Current page marker | Number | 1 |
        | ``totalPages`` | Total amount of pages on list | Number | 1 |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``pageSizeChanged`` | Triggered on page size selection | new page size |

    #### Messages.vue

    Each message properties object has the following structure: ``{ id, type, text }``. Every props object is a
    message on its own, being: ``id``, the message ID; ``type``, the message color variant on Bulma colors; and
    ``text``, the string describing the message itself.

    - #### Properties
        | Name | Description | Type | Default|
        |:---|:---|:---:|:---:|
        | ``messages`` | Array of Objects containing messages props | Array | - |

    - #### Events
        | Name | Description | Parameters |
        |:---|:---|:---:|
        | ``messageDismissed`` | On message close action | Dismissed message id |
