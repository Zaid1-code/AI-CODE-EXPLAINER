const codeInput = document.getElementById("code");
const lineCount = document.getElementById("lineCount");


// =========================================================
// COUNT LINES
// =========================================================

codeInput.addEventListener("input", () => {

    const text = codeInput.value;

    if (!text.trim()) {
        lineCount.textContent = "0 lines";
        return;
    }

    const lines = text.split("\n").length;

    lineCount.textContent =
        lines + (lines === 1 ? " line" : " lines");
});


// =========================================================
// EXPLAIN CODE
// =========================================================

async function explainCode() {

    const code = codeInput.value;

    const language =
        document.getElementById("language").value;

    const button =
        document.getElementById("explainBtn");

    const loading =
        document.getElementById("loading");

    const result =
        document.getElementById("result");

    const output =
        document.getElementById("output");


    if (!code.trim()) {

        alert("Please paste some code first.");

        return;
    }


    button.disabled = true;

    loading.style.display = "flex";

    result.style.display = "none";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/explain",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code,
                    language: language
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Something went wrong"
            );
        }


        output.innerHTML =
            marked.parse(data.explanation);


        result.style.display = "block";


        result.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        alert(
            "Unable to explain the code.\n\n" +
            error.message
        );

    } finally {

        button.disabled = false;

        loading.style.display = "none";
    }
}


// =========================================================
// FIND BUGS
// =========================================================

async function findBugs() {

    const code = codeInput.value;

    const language =
        document.getElementById("language").value;

    const button =
        document.getElementById("bugsBtn");

    const loading =
        document.getElementById("loading");

    const result =
        document.getElementById("result");

    const output =
        document.getElementById("output");


    if (!code.trim()) {

        alert("Please paste some code first.");

        return;
    }


    button.disabled = true;

    loading.style.display = "flex";

    result.style.display = "none";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/bugs",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code,
                    language: language
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Something went wrong"
            );
        }


        output.innerHTML =
            marked.parse(data.bugs);


        result.style.display = "block";


        result.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        alert(
            "Unable to analyze the code.\n\n" +
            error.message
        );

    } finally {

        button.disabled = false;

        loading.style.display = "none";
    }
}


// =========================================================
// CLEAR CODE
// =========================================================

function clearCode() {

    codeInput.value = "";

    lineCount.textContent = "0 lines";

    document.getElementById("result").style.display = "none";
}


// =========================================================
// COPY AI RESPONSE
// =========================================================

async function copyExplanation() {

    const output =
        document.getElementById("output");


    try {

        await navigator.clipboard.writeText(
            output.innerText
        );

        alert("Explanation copied! 📋");

    } catch {

        alert("Unable to copy the explanation.");
    }
}