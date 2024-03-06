# My Account README

This README details the Sierra API endpoints that now support [Research Catalog's My Account page](https://www.nypl.org/research/research-catalog/account) (instead of the webscraping previously used).

## Account API Endpoints Cheatsheet

| Description            | Request method | Internal route                              | Example request body (\* is required field)                      |
| ---------------------- | -------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| Update hold request    | POST           | `/api/account/holds/update/{holdId}`        | `{"patronId"*: 123456, "freeze": false, "pickupLocation": "sn"}` |
| Cancel hold request    | POST           | `/api/account/holds/cancel/{holdId}`        | `{"patronId"*: 123456`                                           |
| Update patron settings | PUT            | `/api/account/settings/{patronId}`          | `{"emails": ['new@email.com], "phones": [6466600432]}`           |
| Update patron PIN      | PUT            | `/api/account/update-pin/{patronId}`        | `{"oldPin"*: 1234, "newPin"*: 7890, "barcode"*: 123456789}`      |
| Renew checkout         | PUT            | `/api/account/checkouts/renew/{checkoutId}` | `{"patronId"*: 123456}`                                          |

TO-DO: Expand each endpoint into its own section, with example request body pulled into that.
