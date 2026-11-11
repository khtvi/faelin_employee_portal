# Peer Rehearsal Notes & Final Week Plan (`rehearsal-notes.md`)

**Course**: Human-Computer Interaction | Final Capstone Project  
**Business**: Faelin Bookshop Management System  
**Rehearsal Date**: October 27, 2026  
**Rehearsal Partner**: Sarah (Motor Shop Management System)  

---

## 1. Peer Rehearsal Evaluation Sheet

| Evaluation Criterion | Yes | Partly | No | Partner Notes & Observations |
|----------------------|:---:|:------:|:--:|------------------------------|
| **1. The live page opened without problems** | [x] | [ ] | [ ] | Loaded quickly because server was pre-warmed. |
| **2. The demo told a clear story** | [x] | [ ] | [ ] | Strong narrative connecting bookshop operations to customer orders. |
| **3. It was finished in 8 minutes or less** | [x] | [ ] | [ ] | Clocked in at 7 minutes 18 seconds. |
| **4. They showed a problem and a clear message** | [x] | [ ] | [ ] | Wrong password error banner was clearly visible. |
| **5. They explained the code in their own words** | [x] | [ ] | [ ] | Clear explanation of foreign key check in POST route. |
| **6. They ran npm test and it passed** | [x] | [ ] | [ ] | Ran smoothly, all tests passed in ~950ms. |
| **7. They stayed calm when something went wrong** | [x] | [ ] | [ ] | Remained composed throughout demonstration. |
| **8. Question 1 answered clearly** | [x] | [ ] | [ ] | Explained why passwords are saved as bcrypt hashes. |
| **9. Question 2 answered clearly** | [x] | [ ] | [ ] | Explained why API key stays on the backend server. |
| **10. The live change worked in under 2 minutes** | [x] | [ ] | [ ] | Partner gave live change prompt: "Change rainy weather tip text". Completed in 1m 15s. |

---

## 2. Three Concrete Improvements Before the Final

1. **Slow Down During Code Explanation**:
   - *Observation*: Spoke slightly too rapidly while pointing out lines in `server.js`.
   - *Action*: Will take a deliberate breath before explaining the code section, point the cursor directly to the validation lines, and highlight the parameterized `?` placeholder.

2. **Pre-Enlarge Browser Zoom Level**:
   - *Observation*: Text on table rows was slightly small when viewed from across the table.
   - *Action*: Will press `Ctrl + +` twice to set browser zoom to 125% before starting the demo so the professor can read the text clearly from a distance.

3. **Pre-Warm the Free Render Instance**:
   - *Observation*: Free Render web services sleep after 15 minutes of inactivity.
   - *Action*: Open the `.onrender.com` URL on a mobile device 5 minutes before presentation time so the container is already awake and responsive.

---

## 3. Plan for the Final Week (5-Line Countdown)

1. **Sunday (Day -4)**: Execute final code lock—freeze all repository features and run `npm test` to ensure zero regressions.
2. **Monday (Day -3)**: Run 3 timed rehearsals of the 8-minute demo script using a stopwatch, polishing oral transitions.
3. **Tuesday (Day -2)**: Verify GitHub repository cleanliness ensuring zero hardcoded keys, clean `.gitignore`, and live links working.
4. **Wednesday (Day -1)**: Fully charge laptop and phone, pack charger, configure personal mobile hotspot as Wi-Fi backup, and write demo credentials on index card.
5. **Thursday (Presentation Day)**: Arrive 20 minutes early, pre-warm live Render site 5 minutes prior, launch local server, and deliver demo with confidence.
