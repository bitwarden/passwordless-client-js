// Print Status messages to UI.
const status = document.getElementById("status");

function Status(text) {
    const currentText = status.innerText;

    if (typeof text === 'object' && text !== null) {
        text = JSON.stringify(text, null, 2)
    }

    var newLine =
        "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
    status.innerText = newLine + currentText;
}

Status("Welcome! Please register or sign in");

if (!API_KEY || API_KEY[0] === "<" || API_KEY === "YOUR_API_KEY") {
    Status("⚠️⚠️⚠️ Missing API Key. Please change the API_KEY in index.html and API_KEY_SECRET in the backend before running the example.")
}
