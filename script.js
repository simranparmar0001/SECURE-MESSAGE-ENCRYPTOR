const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const keyInput = document.getElementById("key");
const charCount = document.getElementById("charCount");

// Update character count
inputText.addEventListener("input", () => {
    charCount.textContent = "Characters: " + inputText.value.length;
});

// AES Encryption
function encrypt() {
    const text = inputText.value;
    const key = keyInput.value;

    if (!text) {
        alert("Enter a message to encrypt!");
        return;
    }
    if (!key) {
        alert("Enter a secret key/password!");
        return;
    }

    // AES encryption
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    outputText.value = encrypted;
}

// AES Decryption
function decrypt() {
    const encryptedText = inputText.value;
    const key = keyInput.value;

    if (!encryptedText) {
        alert("Enter an encrypted message to decrypt!");
        return;
    }
    if (!key) {
        alert("Enter the secret key/password!");
        return;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            alert("Wrong key or corrupted message!");
            outputText.value = "";
            return;
        }

        outputText.value = decrypted;
    } catch (error) {
        alert("Error during decryption!");
        outputText.value = "";
    }
}

// Copy result
function copyText() {
    if (!outputText.value) return;
    outputText.select();
    navigator.clipboard.writeText(outputText.value);
    alert("Copied to clipboard!");
}

// Download result
function downloadText() {
    if (!outputText.value) return;
    const blob = new Blob([outputText.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "encrypted_message.txt";
    link.click();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}