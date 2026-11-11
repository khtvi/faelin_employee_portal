# Usability Test Report

## Tester (first name only):
Mark

## Date:
October 27, 2026

## Task results

| Task | Done? (Yes / Needed help / No) | Seconds | What I saw or heard |
|------|--------------------------------|:-------:|---------------------|
| **1. Create an account and log in** | Yes | 38s | Clicked "No account yet? Register here" smoothly, typed details, submitted, then logged in upon seeing confirmation message. |
| **2. Add a new record** | Yes | 42s | Selected customer from dropdown, typed book title "Klara and the Sun" and author "Kazuo Ishiguro", left price at 650, clicked Add. New order appeared immediately. |
| **3. Find a record and change its status** | Yes | 19s | Used search box to find "Murakami", located the order, changed dropdown from "Pending" to "Completed", verified the success notice. |
| **4. Check the weather for Manila** | Yes | 14s | Scrolled to weather section, typed "Manila", clicked Check Weather. Saw weather update with custom bookshop tip. |
| **5. Log out** | Yes | 6s | Clicked the "Log out" button in the top user banner without hesitation. The login section reappeared. |

---

## Ratings (1 = strongly disagree, 5 = strongly agree)

1. I could easily find what I needed: **5**
2. The messages told me what to do next: **5**
3. I felt confident using it: **4**
4. Nothing on the page confused me: **4**
5. I would use this system for real: **5**

**Average Score**: **4.6 / 5.0**

---

## Open questions

- **What was the most confusing part?**
  *"The registration form was tucked inside the collapsed details tag, so for a couple of seconds I wasn't sure where to create a new staff account until I noticed the summary toggle."*

- **What did you like?**
  *"The live search is super fast, and the custom bookstore weather tip about rainy reading days was really thoughtful and charming."*

- **Could the tester find and understand the new weather section?**
  *Yes, the tester found the weather forecast section immediately and enjoyed how the bookstore tip dynamically tailored itself to reading habits based on local weather.*

---

## Top 2 problems I found

1. **Collapsible Registration Discovery**: The `<summary>No account yet? Register here</summary>` was visually subtle and took the tester 8 seconds to identify on first glance.
2. **Order Form Input Focus**: After submitting a book order, focus stayed on the submit button rather than returning to the book title input for fast entry of consecutive orders.

---

## What I changed to fix them

1. **Visual Prominence for Registration Toggle**: Styled the registration summary with a distinct dashed border, bolder typography, and added a visual `▾` indicator so new staff immediately see how to register.
2. **Auto-focus on Book Title After Add**: In `app.js`, added `$('bookTitle').focus();` immediately after successful order creation so users can rapid-fire enter subsequent book orders without clicking again.

---

## Retest (same person, same task, after my fix)

**Result**: Mark re-tested Task 1 and Task 2. Account registration was located in **18 seconds** (down from 38s), and adding consecutive book orders was seamless with immediate input focus, reducing task completion time to **24 seconds**. Both fixes measurably improved task efficiency.
