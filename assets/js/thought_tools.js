// thought_tools.js - Manage Thought Polishing and Expanding with Groq

document.addEventListener('DOMContentLoaded', function () {
  const polishButton = document.getElementById('polish-thought');
  const expandButton = document.getElementById('expand-thought');
  const thoughtInput = document.getElementById('thought-input');
  const thoughtResult = document.getElementById('thought-result');

  const apiKey = "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";
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  let thinkingInterval;

  polishButton.addEventListener('click', () => {
    const userThought = thoughtInput.value.trim();
    if (!userThought) {
      thoughtResult.textContent = "Please write something first!";
      return;
    }
    sendThoughtToGroq(userThought, "polish");
  });

  expandButton.addEventListener('click', () => {
    const userThought = thoughtInput.value.trim();
    if (!userThought) {
      thoughtResult.textContent = "Please write something first!";
      return;
    }
    sendThoughtToGroq(userThought, "expand");
  });

  async function sendThoughtToGroq(thought, action) {
    startThinkingAnimation(action);

    let systemPrompt = "";

    if (action === "polish") {
      systemPrompt = "You are a friendly and casual writing coach. Help the user by rephrasing their thought to sound clear, natural, and easy to read. Keep it casual and understandable for everyone. Limit to 2-4 sentences.";
    } else if (action === "expand") {
      systemPrompt = "You are a friendly and casual writing coach. Take the user's thought and expand it naturally into a short paragraph (4-6 sentences), adding depth but keeping a casual, easy-to-read style.";
    }

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
            { role: "system", content: systemPrompt },
            { role: "user", content: `Here is my thought: ${thought}` }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();

      stopThinkingAnimation();
      thoughtResult.classList.remove('fade-in');

      if (data && data.choices && data.choices.length > 0) {
        thoughtResult.innerHTML = `
          <div class="thought-card">
            ${data.choices[0].message.content.trim()}
          </div>
        `;
        thoughtResult.classList.add('fade-in');
      } else {
        thoughtResult.textContent = "Sorry, I couldn't polish your thought right now. Try again!";
      }
    } catch (error) {
      console.error("Error processing thought:", error);
      stopThinkingAnimation();
      thoughtResult.textContent = "Oops! Something went wrong.";
    }
  }

  function startThinkingAnimation(action) {
    let dots = "";
    let thinkingText = action === "polish" ? "Polishing" : "Expanding";
    thoughtResult.textContent = thinkingText;
    thinkingInterval = setInterval(() => {
      dots += ".";
      if (dots.length > 3) dots = "";
      thoughtResult.textContent = thinkingText + dots + " ✨";
    }, 500);
  }

  function stopThinkingAnimation() {
    clearInterval(thinkingInterval);
  }
});
