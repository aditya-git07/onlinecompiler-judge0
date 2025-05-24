async function runCode() {
    const code = document.getElementById('code').value;
    const langId = document.getElementById('language').value;
    const outputBox = document.getElementById('output');
    const spinner = document.getElementById('spinner');
    
    outputBox.textContent = 'Compiling...';
    spinner.style.display = 'block'; 

    try {
        const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "025a4a6ce3msha6d4d31021b809dp138f53jsn2de7cdfa73d8"
            },
            body: JSON.stringify({
                source_code: code,
                language_id: langId
            })
        });

        const result = await response.json();
        spinner.style.display = 'none'; // Hide spinner once done

        if (result.stdout) {
            outputBox.textContent = result.stdout;
        } else if (result.stderr) {
            outputBox.textContent = "❌ Runtime Error:\n" + result.stderr;
        } else if (result.compile_output) {
            outputBox.textContent = "❌ Compilation Error:\n" + result.compile_output;
        } else {
            outputBox.textContent = "⚠ Unknown Error.";
        }

    } catch (err) {
        outputBox.textContent = "🚨 Error while connecting to the API: " + err.message;
        spinner.style.display = 'none';
        console.error("API Error:", err);
    }
}