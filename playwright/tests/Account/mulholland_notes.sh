‎.github/workflows/playwright_qa.yml‎
16
name, card number, and probably even username don't need to be stored as secrets/environment variables– they're not sensitive information

line 48
Why remove firefox?



‎playwright/tests/Account/account.spec.ts‎

3 - done.  commented out.
I think this helper isn't necessary, this is what you're already doing in the beforeAll

46
noted elsewhere but these shouldn't be env vars

46-48
Noted in the page spec but check what this test is actually doing.

63-65
if you look at how this is used in the test, this isn't really testing anything– you're just checking page.getByText(process.env.QA_USERNAME) = hasText(process.env.QA_USERNAME). Update this locator to use a selector for this chunk of text, as you do above for name, or just remove it and write the test to check for the text without a locator

165-166
Usually, would be great to have these tests split up into discrete blocks, but here I think it's better to just log in once. Move all these tests into the block above, so you don't need another beforeAll to log in again

182-185
All of these check and resets are redundant– this test file should clean up after itself when it's done, and it shouldn't need to check again before testing that the account's in the expected state

237
Rm every use of await loginAndGetAccountPage(page)– it's already logged in and on the account page. Not sure how this would create duplicate patron records in Sierra but it's certainly slowing these tests down a lot and making a bunch of calls to Sierra very quickly

259 -262
For all of these edit blocks, move the Revert stuff into a final afterAll block that should reset the account to its original state.












‎playwright/pages/account_page.ts‎
65 - done
if you look at how this is used in the test, this isn't really testing anything– you're just checking page.getByText(process.env.QA_USERNAME) = hasText(process.env.QA_USERNAME). Update this locator to use a selector for this chunk of text, as you do above for name, or just remove it and write the test to check for the text without a locator

67 - done
nit: typo in "username"

3 done
rm these imports, unused

