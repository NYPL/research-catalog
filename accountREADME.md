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

```
exampleSuccessResponse: {
    status: 200,
    message: 'Updated'
}
exampleFailureResponse: {
    status: 403,
    message: 'Something from Sierra'
}

```

| Cancel hold request | POST | `/api/account/holds/cancel/{holdId}` |
| ------------------- | ---- | ------------------------------------ |

Route parameter is the hold ID. Request body requires the **patron ID**.

```
exampleBody: {
    patronId: "123456",
},
```

```
exampleSuccessResponse: {
    status: 200,
    message: 'Canceled'
}
exampleFailureResponse: {
    status: 403,
    message: 'Something from Sierra'
}

```

| Update patron settings | PUT | `/api/account/settings/{patronId}` |
| ---------------------- | --- | ---------------------------------- |

Route parameter is the patron ID. Request body can include any fields on the patron model (see [Sierra API](https://sandbox.iii.com/iii/sierra-api/swagger/index.html#!/patrons/Update_the_Patron_record_put_19)).

```

exampleBody: {
    "emails": ['new@email.com],
    "phones": [6466600432]
},

```

```
exampleSuccessResponse: {
    status: 200,
    message: 'Updated'
}
exampleFailureResponse: {
    status: 403,
    message: 'Something from Sierra'
}

```

| Update patron PIN | PUT | `/api/account/update-pin/{patronId}` |
| ----------------- | --- | ------------------------------------ |

Route parameter is the patron ID. Request body requires the patron's **current PIN**, the **new PIN**, and the **patron's barcode**. Internally, this endpoint first validates the old PIN, then calls the "Update patron settings" endpoint with the new PIN.

```

exampleBody: {
    "oldPin": 1234,
    "newPin": 7890,
    "barcode": 123456789
},

```

```
exampleSuccessResponse: {
    status: 200,
    message: 'Pin updated to 7890'
}
exampleFailureResponse: {
    status: 403,
    message: 'Something from Sierra'
}

```

| Renew checkout | PUT | `/api/account/checkouts/renew/{checkoutId}` |
| -------------- | --- | ------------------------------------------- |

Route parameter is the checkout ID. Request body requires the **patron ID**.

```

exampleBody: {
    "patronId": 123456
},

```

```
exampleSuccessResponse: {
    status: 200,
    message: "Renewed",
    body: {
    // A checkout object with new due date
    {
        id: 'https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/58536267',
        patron: 'https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743',
        item: {
            id: '36021891',
            updatedDate: '2024-02-23T15:00:02Z',
            createdDate: '2018-03-26T12:04:00Z',
            deleted: false,
            bibIds: [Array],
            location: [Object],
            status: [Object],
            volumes: [],
            barcode: '33333422348520',
            callNumber: 'J SPA 551.46 R'
        },
        dueDate: '2024-03-15T08:00:00Z',
        numberOfRenewals: 10,
        outDate: '2024-02-14T22:05:04Z'
    },
  }
}
exampleFailureResponse: {
    status: 403,
    message: "TOO MANY RENEWALS. Please contact gethelp@nypl.org for assistance."
}

```
