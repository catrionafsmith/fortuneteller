
const fortuneButton = document.getElementById('fetch-fortune-btn')
const output = document.querySelector('.api-output')
const loadingButton = document.getElementById("loadingButton")
const outputContainer = document.getElementById("output-container")

// Function for Fortune page
if (fortuneButton) {
    fortuneButton.addEventListener('click', async () => {
        loadingButton.style.display = 'block'
        loadingButton.scrollIntoView({ behavior: 'smooth' })
        // console.log(text)
        const prompt = `You are an old wizened fortune-telling robot with a snarky tone who can see into the future. I say please tell me how i will make my fortune in the tech industry. In three paragraphs, tell me my fortune and finish with a bizarre tech saying that you have invented. You reply:`
        // console.log(prompt)
    
        const keyresp = await fetch('/.netlify/functions/get-token')
        .then(response => response.json()
        )
    
        const response = await fetch(
                `https://api.openai.com/v1/completions`,
                {
                    body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0.86, "max_tokens": 200}),
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization:`Bearer ` + keyresp['message'],
                    },
                        }
            ).then((response) => {
                console.log(text)
                if (response.ok) {
                    response.json().then((json) => {
                        output.textContent = json.choices[0].text.trim();
                    });
                }
                
                outputContainer.style.display = 'block';
                loadingButton.style.display = 'none';
                selectFeedbackForm.style.display = 'block';
                outputContainer.scrollIntoView({ behavior: 'smooth' })
            });
    
            // console.log("Completed!");
    
        });
}




// Function to copy output to clipboard. N.B. User must enable copying in their browser
function copyToClipboard() {
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value).then(function(x) {
        // alert("Copied to clipboard: " + copyText.value);
        alert("Copied to clipboard: ");
    });
}    

