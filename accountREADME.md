# My Account README

This README details the Sierra API endpoints that now support [Research Catalog's My Account page](https://www.nypl.org/research/research-catalog/account) (instead of the webscraping previously used).

## Account API Endpoints

Each of these endpoints responds with a status code and accompanying message. If it errors, the message will be from Sierra (ex. "Too soon to renew"), and if it succeeds, message is generated (ex. "Updated"). Only `/api/account/checkouts/renew/{checkoutId}` returns a response body– the updated checkout object.

See `src/pages/api/account` for handlers and helpers in more detail.

| Description            | Request method | Internal route                              | Example request body (\* is required field)                      |
| ---------------------- | -------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| Update hold request    | POST           | `/api/account/holds/update/{holdId}`        | `{"patronId"*: 123456}`                                          |
| Cancel hold request    | POST           | `/api/account/holds/cancel/{holdId}`        | `{"patronId"*: 123456, "freeze": false, "pickupLocation": "sn"}` |
| Update patron settings | PUT            | `/api/account/settings/{patronId}`          | `{"emails": ['new@email.com], "phones": [6466600432]}`           |
| Update patron PIN      | PUT            | `/api/account/update-pin/{patronId}`        | `{"oldPin"*: 1234, "newPin"*: 7890, "barcode"*: 123456789}`      |
| Renew checkout         | PUT            | `/api/account/checkouts/renew/{checkoutId}` | `{"patronId"*: 123456}`                                          |
