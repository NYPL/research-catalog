# My Account: Phase 1

This README details the Sierra API endpoints that now support [Research Catalog's My Account page](https://www.nypl.org/research/research-catalog/account) (instead of the webscraping previously used). See [Sierra API documentation](https://sandbox.iii.com/iii/sierra-api/swagger/index.html#!/patrons) for more information.

## Account API Endpoints

| Description | Request method | Internal route |
| ----------- | -------------- | -------------- |

| Update hold request | POST | `/api/account/holds/update/{holdId}` |
| ------------------- | ---- | ------------------------------------ |

Route parameter is the hold ID. Request body requires the **patron ID**, and can include `freeze` (boolean) and `pickupLocation` (a location code).

```
exampleBody: {
          patronId: "123456",
          freeze: true,
          pickupLocation: "sn",
},
```

| Cancel hold request | POST | `/api/account/holds/cancel/{holdId}` |
| ------------------- | ---- | ------------------------------------ |

Route parameter is the hold ID. Request body requires the **patron ID**.

```
exampleBody: {
          patronId: "123456",
},
```

| Update patron settings | PUT | `/api/account/settings/{patronId}` |
| ---------------------- | --- | ---------------------------------- |

Route parameter is the patron ID. Request body can include any fields on the patron model (see [Sierra API](https://sandbox.iii.com/iii/sierra-api/swagger/index.html#!/patrons/Update_the_Patron_record_put_19)).

```
exampleBody: {
         "emails": ['new@email.com], "phones": [6466600432]
},
```

| Update patron PIN | PUT | `/api/account/update-pin/{patronId}` |
| ----------------- | --- | ------------------------------------ |

Route parameter is the patron ID. Request body requires the patron's **current PIN**, the **new PIN**, and the **patron's barcode**. Internally, this endpoint first validates the old PIN, then calls the "Update patron settings" endpoint with the new PIN.

```
exampleBody: {
         "oldPin": 1234, "newPin": 7890, "barcode": 123456789
},
```

| Renew checkout | PUT | `/api/account/checkouts/renew/{checkoutId}` |
| -------------- | --- | ------------------------------------------- |

Route parameter is the checkout ID. Request body requires the **patron ID**.

```
exampleBody: {
        "patronId": 123456
},
```
