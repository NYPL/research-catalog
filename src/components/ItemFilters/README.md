# Item Filters

## Variable name conventions
- `option`: a combination of label and value. An option for the user to select for the filter. Such as { value: "loc:mal", label: "SASB Location"}. 
- `value`: api readable string, used to create the search query
- `label`: human readable gloss for the value
- `selectedOptions`: locally selected options per filter that have not been applied
- `activeFilters`: the filters most recently sent to the discovery api and used to filter the items currently rendered
- `field`: the category of options. The three supported fields are `location`, `format`, and `status`

## Filter state
DS `CheckboxGroup` is used to maintain `selectedOptions` per filter. The DS `Checkboxes` are controlled by the `CheckboxGroup`.
Clicking the `Apply` and `Clear` buttons dispatch the `selectedOptions` to the `FiltersContainer` component. Their `onClick`s dispatch new selections or an empty array in the case of `Clear`ing. The parent component is listening for changes to activeFilters. When those change, they are used to generate a new URL that triggers a discovery-api query using the new filters.
Closing a filter, whether by clicking the filter's label element, or by clicking outside of the filter, clears the local state's `selectedOptions`.

## Open/Close state
Only one `ItemFilter` can be open at a time, so the `FiltersContainer` component only needs the field of the open filter (or an empty string). Each filter's `isOpen` state is then determined by whether `whichFilterIsOpen` corresponds to that filter. If `whichFilterIsOpen` is an empty string, no filter's field will match on it, so they will all be closed.

While there is only one place where the open/close state is maintained, there are two different mechanisms that trigger a change in that state:
- Clicking on the `ItemFilter` dispatches either that filter's field or an empty string.
- Clicking outside of the `ItemFilter` or hitting the escape key triggers the `useCloseDropDown` hook. This hook is provided a callback which sets `whichFilterIsOpen` to an empty string.
