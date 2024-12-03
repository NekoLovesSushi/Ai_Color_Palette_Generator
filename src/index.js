// Select form elements
const paletteForm = document.querySelector("#paletteForm");
const promptInput = document.querySelector("#prompt");
const paletteContainer = document.querySelector("#paletteContainer");
const apiKey = "21e8a41ecb5f3t140bf774eca0oae7aa";

// Initially hide the palette container
paletteContainer.classList.add("hidden");

// Handle form submission
paletteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the user prompt
    const prompt = promptInput.value;

    // Show the loading message while generating the palette
    paletteContainer.classList.remove("hidden"); // Show the palette container
    paletteContainer.innerHTML = `
        <div class="loading-message">
            <div class="spinner"></div>
            <p>Generating your "${prompt}" themed color palette...</p>
        </div>
    `;

    // API call to generate a color palette using SheCodes AI
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=Provide a 5-color palette in HEX format&key=${apiKey}`;

    // Make an Axios GET request to generate the color palette
    axios.get(apiURL)
        .then(function (response) {
            console.log("API Response:", response);
            const answer = response.data.answer;
            const colors = answer.match(/#[a-fA-F0-9]{6}/g); 

            if (colors && colors.length === 5) {
                // Replace the loading message with the generated colors
                paletteContainer.innerHTML = colors.map(color => `
                    <div class="color-block-wrapper">
                        <div class="color-block" style="background-color: ${color};"></div>
                        <span class="color-label">${color}</span>
                    </div>
                `).join('');
            } else {
                paletteContainer.innerHTML = "No color palette could be generated. Please try another theme.";
            }
        })
        .catch(function (error) {
            console.error("Error fetching the color palette:", error);
            paletteContainer.innerHTML = "Sorry, couldn't generate a color palette at the moment. Please check your input or try again later.";
        });
});
