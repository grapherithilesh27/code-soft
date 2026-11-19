# Code Soft: Web Projects

Three small web projects in plain HTML, CSS and JavaScript. No frameworks, no build step.

**Live:** https://grapherithilesh27.github.io/code-soft/

| Project | What it does | Live |
|---|---|---|
| [Calculator](calculator/) | Chained operations, percent, backspace, full keyboard support. Uses a small state machine instead of `eval()`, and handles divide-by-zero and floating-point rounding (0.1 + 0.2 = 0.3) | [open](https://grapherithilesh27.github.io/code-soft/calculator/) |
| [Nuclear Boiler Countdown](countdown/) | Countdown where three "boilers" drain as time runs out. Pause/resume keeps the remaining time; the boilers glow red in the last 10 seconds | [open](https://grapherithilesh27.github.io/code-soft/countdown/) |
| [Portfolio](portfolio/) | Responsive personal portfolio with a mobile menu, project cards linking to live demos and code, and a contact form that opens your email app | [open](https://grapherithilesh27.github.io/code-soft/portfolio/) |

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
