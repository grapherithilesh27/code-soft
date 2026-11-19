// Simple, safe calculator: no eval(), operations are applied one at a time.
const display = document.getElementById("display");
const history = document.getElementById("history");

const state = { current: "0", previous: null, operator: null, fresh: false };
const SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function compute(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? NaN : a / b;
    }
}

function format(n) {
    if (!Number.isFinite(n)) return "Error";
    // avoid 0.1 + 0.2 = 0.30000000000000004
    return String(parseFloat(n.toPrecision(12)));
}

function render() {
    display.textContent = state.current;
    history.textContent = state.previous !== null ? `${state.previous} ${SYMBOL[state.operator]}` : "";
    document.querySelectorAll("[data-op]").forEach(b =>
        b.classList.toggle("active", b.dataset.op === state.operator && state.fresh));
}

function inputDigit(d) {
    if (state.current === "Error" || state.fresh) {
        state.current = d;
        state.fresh = false;
    } else {
        state.current = state.current === "0" ? d : state.current + d;
    }
}

function inputDecimal() {
    if (state.current === "Error" || state.fresh) { state.current = "0."; state.fresh = false; return; }
    if (!state.current.includes(".")) state.current += ".";
}

function chooseOperator(op) {
    if (state.current === "Error") return;
    if (state.operator && !state.fresh) {
        state.current = format(compute(parseFloat(state.previous), parseFloat(state.current), state.operator));
    }
    state.previous = state.current;
    state.operator = op;
    state.fresh = true;
}

function equals() {
    if (!state.operator || state.fresh) return;
    const expr = `${state.previous} ${SYMBOL[state.operator]} ${state.current} =`;
    state.current = format(compute(parseFloat(state.previous), parseFloat(state.current), state.operator));
    state.previous = null;
    state.operator = null;
    state.fresh = true;
    render();
    history.textContent = expr;
}

function clearAll() { Object.assign(state, { current: "0", previous: null, operator: null, fresh: false }); }

function deleteLast() {
    if (state.fresh || state.current === "Error") return;
    state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
    if (state.current === "-") state.current = "0";
}

function percent() {
    if (state.current !== "Error") state.current = format(parseFloat(state.current) / 100);
}

document.querySelector(".keys").addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.digit) inputDigit(b.dataset.digit);
    else if (b.dataset.op) chooseOperator(b.dataset.op);
    else {
        const action = b.dataset.action;
        if (action === "equals") return equals();
        ({ clear: clearAll, delete: deleteLast, percent, decimal: inputDecimal })[action]();
    }
    render();
});

document.addEventListener("keydown", e => {
    if (/^\d$/.test(e.key)) inputDigit(e.key);
    else if (e.key in SYMBOL) chooseOperator(e.key);
    else if (e.key === ".") inputDecimal();
    else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); return equals(); }
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clearAll();
    else if (e.key === "%") percent();
    else return;
    render();
});

render();
