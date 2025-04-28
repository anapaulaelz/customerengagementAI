// groq_api.js - Connect to Groq API for real book recommendations

document.addEventListener('DOMContentLoaded', function () {
    const genreSelect = document.getElementById('genre-select');
    const recommendButton = document.getElementById('recommend-button');
    const recommendationResult = document.getElementById('recommendation-result');
  
    const apiKey = "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";
    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
  
    let thinkingInterval; // Control animation of thinking...
  
    recommendButton.addEventListener('click', async () => {
      const selectedGenre = genreSelect.value;
  
      if (!selectedGenre) {
        recommendationResult.textContent = "Please select a genre to get a recommendation.";
        return;
      }
  
      startThinkingAnimation();
  
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant that recommends books based on genre. First, mention only the title and author in one clear sentence. Then, provide a 3-4 sentence engaging summary about the book without spoilers. Write in English."
              },
              {
                role: "user",
                content: `Suggest a book recommendation for the genre: ${selectedGenre}.`
              }
            ],
            temperature: 0.7
          })
        });
  
        const data = await response.json();
  
        stopThinkingAnimation();
        recommendationResult.classList.remove('fade-in');
  
        if (data && data.choices && data.choices.length > 0) {
          const fullResponse = data.choices[0].message.content.trim();
  
          // Split first line (title+author) and the rest (summary)
          const firstLineEnd = fullResponse.indexOf('.') + 1; // Find the end of the first sentence
          const titleAuthor = fullResponse.slice(0, firstLineEnd).trim();
          const summary = fullResponse.slice(firstLineEnd).trim();
  
          recommendationResult.innerHTML = `
             <div class="recommendation-card">
                <strong>${titleAuthor}</strong>
                <p>${summary}</p>
            </div>
          `;
          recommendationResult.classList.add('fade-in');
        } else {
          recommendationResult.textContent = "Sorry, I couldn't find a recommendation. Try again!";
          recommendationResult.classList.add('fade-in');
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        stopThinkingAnimation();
        recommendationResult.textContent = "Oops! Something went wrong.";
      }
    });
  
    function startThinkingAnimation() {
      let dots = "";
      recommendationResult.textContent = "Thinking";
      thinkingInterval = setInterval(() => {
        dots += ".";
        if (dots.length > 3) {
          dots = "";
        }
        recommendationResult.textContent = "Thinking" + dots + " ✨";
      }, 500);
    }
  
    function stopThinkingAnimation() {
      clearInterval(thinkingInterval);
    }
  });
  