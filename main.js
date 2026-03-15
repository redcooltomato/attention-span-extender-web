let variable = localStorage.getItem("variable") || "";
let input = prompt(variable, variable);

if (input !== null) {
    localStorage.setItem("variable");
}