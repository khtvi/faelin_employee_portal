# UI & Accessibility Test Plan (`ui-tests.md`)

**Course**: Human-Computer Interaction | Final Capstone Project  
**Business**: Faelin Bookshop Management System  
**Week / Meeting**: Week 16, Meeting 1  
**Target URL**: `http://localhost:3000`  

---

## 1. Overview & HCI Principles
The Faelin Bookshop user interface was engineered to adhere to strict Human-Computer Interaction (HCI) and accessibility standards:
1. **Always Inform the User**: Immediate visual feedback is displayed in an ARIA-live announcement banner (`#message [role="status"]`) for every operation.
2. **Plain English Feedback**: Avoid raw technical error codes; use human-friendly descriptions (e.g., "Your login expired. Please log in again").
3. **No Color Alone**: Error alerts are prefixed with the literal label `Problem: `, with distinctive border styles and high-contrast background shading for color-blind users.
4. **Full Keyboard Navigation**: Every interactive element is reachable via standard `Tab`, `Shift+Tab`, and `Enter` sequences with distinct high-visibility focus rings (`:focus-visible`).
5. **Robust Cross-Device Usability**: Responsive design that scales down to 375px (iPhone SE) and zooms to 200% without horizontal document scrolling.

---

## 2. Test Execution Table

| # | Test Scenario / Action | Procedure Performed | Expected Behavior | Actual Behavior Observed | Result |
|---|------------------------|---------------------|-------------------|--------------------------|:------:|
| **1** | Initial Page Load (Public View) | Navigated to `http://localhost:3000` | Header displays "You are not logged in.", the orders table renders customer names and book details, and the Actions column says "Log in to change". | Table rendered 8 book orders with customer names; action buttons were locked to unauthenticated visitors. | **PASS** |
| **2** | Keyboard-Only Navigation & Login | Used only `Tab`, `Shift+Tab`, and `Enter` keys to navigate into the email input, password input, and submit button. | Visual focus outline appears sequentially on every interactive control without jumping or skipping. Form submits on `Enter`. | Clean outline moved predictably through inputs. Logged in successfully without touching a mouse. | **PASS** |
| **3** | Wrong Password Error Feedback | Entered registered email `staff@faelinbooks.com` with incorrect password `badpassword123`. | Displays clear error message beginning with "Problem:" without revealing whether the email exists. | `#message` banner changed to error state: `Problem: Wrong email or password`. | **PASS** |
| **4** | Valid Staff Login & Session Persistence | Logged in with valid staff credentials. Refreshed browser with `F5`. | Top bar displays logged-in user email and role. Add Order form is revealed. State persists across page refresh via `localStorage`. | User remained authenticated as `staff@faelinbooks.com (staff)`. Add order form remained open after refresh. | **PASS** |
| **5** | Add New Book Order | Selected customer "Elena Rostova", typed "The Priory of the Orange Tree", author "Samantha Shannon", genre "Fantasy", price 890.00, and submitted. | Button disables during request to prevent duplicate submissions. New row appears in table with success confirmation. | Confirmation displayed: `Book order added successfully.` Row immediately added to table. | **PASS** |
| **6** | Inline Order Status Change | Changed status dropdown of an order from "Pending" to "Confirmed". | Triggers `PUT /orders/:id`. Confirmation appears, and status change persists. | Message announced: `Order status changed to Confirmed.` Persistent on refresh. | **PASS** |
| **7** | Safe Order Deletion (Admin Confirmed) | Logged in as Admin, clicked "Delete" on an order, clicked "OK" in confirmation dialog. | Browser prompts for confirmation. Upon confirming, order is deleted and table updates. | Dialog confirmed; row removed from table with banner: `Book order deleted.` | **PASS** |
| **8** | Live Search Filter | Typed "Murakami" into the search field. | Table immediately filters in real time to show only Murakami titles. | Table reduced to 2 matching Murakami orders instantly without full-page reloads. | **PASS** |
| **9** | Status Filter Dropdown | Selected "Completed" from the status filter dropdown. | Table shows only orders matching the "Completed" status. | Only completed orders displayed; selecting "All Statuses" restored full list. | **PASS** |
| **10** | Server Offline Defense | Stopped server process (`Ctrl + C`) and attempted to change an order status. | Friendly offline notice appears instead of an unhandled exception or silent freeze. | Displayed: `Problem: Cannot reach the server. Check your internet and try again.` | **PASS** |
| **11** | 200% Display Zoom Test | Held `Ctrl` and zoomed browser view to 200%. | All text, buttons, and form inputs remain fully legible without overlapping or clipping. | Layout reflowed gracefully; table uses horizontal container scrolling without breaking page margins. | **PASS** |
| **12** | Mobile Viewport Check (375px) | Opened DevTools device toolbar set to iPhone SE (375px width). | Page body does not scroll sideways; touch targets exceed minimum 44px height. | Zero sideways body scroll; buttons and inputs are comfortable and easily tappable. | **PASS** |
| **13** | XSS Script Injection Prevention | Added an order with title `<script>alert('XSS')</script>`. | Text is escaped and rendered literally via `textContent`; script does not execute. | Book title rendered safely as raw text tags: `<script>alert('XSS')</script>`. No script execution. | **PASS** |

---

## 3. Peer Usability Observation (Classmate 2-Minute Test)
- **Tester Observation**: During a 2-minute unguided trial, the classmate attempted to type into the "Customer" field before realizing it was a dropdown selection rather than a free-form text input.
- **Improvement Implemented**: Added explicit descriptive label hints and populated the dropdown with both customer name and phone number (`Elena Rostova (0917-111-2222)`) so staff can immediately recognize registered customer profiles.
