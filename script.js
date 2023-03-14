
const fortuneButton = document.getElementById('fetch-fortune-btn')
const output = document.querySelector('.api-output')
const loadingButton = document.getElementById("loadingButton")
const outputContainer = document.getElementById("output-container")
const emailButton = document.getElementById('fetch-email-btn')

// Function for Fortune page
if (fortuneButton) {
    fortuneButton.addEventListener('click', async () => {
        loadingButton.style.display = 'block'
        loadingButton.scrollIntoView({ behavior: 'smooth' })

        const prompt = `You are an old wizened fortune-telling robot with a snarky tone who can see into the future. I say please tell me how i will make my fortune in the tech industry. In three paragraphs, tell me my fortune and finish with a bizarre tech saying that you have invented. You reply:`

    
        const keyresp = await fetch('/.netlify/functions/get-token')
        .then(response => response.json()
        )
    
        const response = await fetch(
                `https://api.openai.com/v1/completions`,
                {
                    body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0.86, "max_tokens": 400}),
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization:`Bearer ` + keyresp['message'],
                    },
                        }
            ).then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        output.textContent = json.choices[0].text.trim();
                    });
                }
                
                outputContainer.style.display = 'block';
                loadingButton.style.display = 'none';
                outputContainer.scrollIntoView({ behavior: 'smooth' })
            });
    
            // console.log("Completed!");
    
        });
    }

