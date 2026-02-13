// ============================================
// CHATBOT JAVASCRIPT - FULL UPDATED VERSION
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  // Elements
  const chatbotFab = document.getElementById("ai-fab");
  const chatbotWindow = document.getElementById("ai-chatbot");
  const chatbotCloseBtn = document.getElementById("ai-close");
  const chatbotSendBtn = document.getElementById("ai-send");
  const chatbotInput = document.getElementById("ai-input");
  const chatbotMessages = document.getElementById("ai-messages");

  // Session ID (per visitor)
  let session_id = localStorage.getItem("chat_session");

  if (!session_id) {
    session_id = crypto.randomUUID();
    localStorage.setItem("chat_session", session_id);
  }

  if (!chatbotFab || !chatbotWindow || !chatbotCloseBtn || !chatbotSendBtn || !chatbotInput || !chatbotMessages) {
    console.error("Chatbot elements missing");
    return;
  }

  let messageCount = 0;

  // Open chatbot
  chatbotFab.onclick = () => {
    chatbotWindow.classList.add("show");
    chatbotFab.classList.add("hide");
    chatbotInput.focus();
  };

  // Close chatbot
  chatbotCloseBtn.onclick = () => {
    chatbotWindow.classList.remove("show");
    chatbotFab.classList.remove("hide");
  };

  // Remove welcome message
  function clearWelcome() {
    const welcome = chatbotMessages.querySelector(".welcome-msg");
    if (welcome) welcome.remove();
  }

  // Add message bubble
  function addMessage(text, isUser) {
    clearWelcome();

    const message = document.createElement("div");
    message.className = `message ${isUser ? "user-msg" : "ai-msg"}`;
    message.style.animationDelay = `${messageCount * 0.05}s`;

    message.innerHTML = `
      <div class="message-avatar">${isUser ? "👤" : "🤖"}</div>
      <div class="message-content">${text}</div>
    `;

    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    messageCount++;

    return message;
  }

  // Typing indicator
  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "message ai-msg";

    typing.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;

    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typing;
  }

  // Send message
  async function sendMessage() {

    const text = chatbotInput.value.trim();
    if (!text) return;

    chatbotInput.value = "";
    chatbotSendBtn.disabled = true;

    addMessage(text, true);

    const typingIndicator = showTyping();

    try {

      const response = await fetch("https://register-approximately-dubai-kits.trycloudflare.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: session_id
        })
      });

      typingIndicator.remove();

      const aiMessageDiv = addMessage("", false);
      const contentDiv = aiMessageDiv.querySelector(".message-content");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value);

        // Render markdown properly
        buffer = buffer
        .replace(/â¢/g, "•")
        .replace(/â/g, "–")
        .replace(/â€™/g, "’");
        contentDiv.innerHTML = marked.parse(buffer);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }

    } catch (err) {
      typingIndicator.remove();
      addMessage("⚠️ Server error. Please try again.", false);
      console.error(err);
    }

    chatbotSendBtn.disabled = false;
    chatbotInput.focus();
  }

  chatbotSendBtn.onclick = sendMessage;

  chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

});
