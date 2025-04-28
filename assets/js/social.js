document.addEventListener('DOMContentLoaded', function () {
  const createPostButton = document.getElementById('create-post-button');
  const bookSelectModal = document.getElementById('book-select-modal');
  const typeSelectModal = document.getElementById('type-select-modal');
  const previewModal = document.getElementById('preview-modal');
  const closeModalBook = document.getElementById('close-modal-book');
  const closeModalType = document.getElementById('close-modal-type');
  const closeModalPreview = document.getElementById('close-modal-preview');
  const bookGrid = document.getElementById('book-grid');
  const typeGrid = document.getElementById('type-grid');
  const postFeed = document.getElementById('post-feed');
  const previewContent = document.getElementById('preview-content');
  const sharePostButton = document.getElementById('share-post');
  const cancelPreviewButton = document.getElementById('cancel-preview');

  const apiKey = "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"; // 🚨 Pega aquí tu API Key real de Groq
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  let selectedBook = null;
  let selectedPostContent = '';

  const books = [
    { title: "The Hobbit", img: "assets/img/hobbit.jpg" },
    { title: "Pride and Prejudice", img: "assets/img/pride.jpg" },
    { title: "1984", img: "assets/img/1984.jpg" },
    { title: "Moby Dick", img: "assets/img/mobydick.jpg" },
    { title: "The Great Gatsby", img: "assets/img/gatsby.jpg" },
    { title: "Harry Potter", img: "assets/img/harrypotter.jpg" },
  ];

  const types = [
    { type: "opinion", label: "Opinion about the Book" },
    { type: "emotions", label: "Main Emotions it Provoked" },
    { type: "question", label: "Ask the Audience a Question" },
  ];

  createPostButton.addEventListener('click', () => {
    bookSelectModal.style.display = 'block';
    renderBooks();
  });

  closeModalBook.addEventListener('click', () => {
    bookSelectModal.style.display = 'none';
  });

  closeModalType.addEventListener('click', () => {
    typeSelectModal.style.display = 'none';
  });

  closeModalPreview.addEventListener('click', () => {
    previewModal.style.display = 'none';
  });

  cancelPreviewButton.addEventListener('click', () => {
    previewModal.style.display = 'none';
  });

  sharePostButton.addEventListener('click', () => {
    savePost(selectedBook, selectedPostContent);
    previewModal.style.display = 'none';
  });

  function renderBooks() {
    bookGrid.innerHTML = "";
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `<img src="${book.img}" alt="${book.title}"><p>${book.title}</p>`;
      card.addEventListener('click', () => {
        selectedBook = book;
        bookSelectModal.style.display = 'none';
        typeSelectModal.style.display = 'block';
        renderTypes();
      });
      bookGrid.appendChild(card);
    });
  }

  function renderTypes() {
    typeGrid.innerHTML = "";
    types.forEach(option => {
      const card = document.createElement('div');
      card.className = 'type-card';
      card.innerHTML = `<p>${option.label}</p>`;
      card.addEventListener('click', () => {
        typeSelectModal.style.display = 'none';
        generatePost(selectedBook, option.type);
      });
      typeGrid.appendChild(card);
    });
  }

  async function generatePost(book, type) {
    const prompt = `
You are a creative Instagram content writer.
Generate a short Instagram-style post for the book "${book.title}" focused on "${type}".
Be casual, emotional and engaging.
Keep it under 80 words.
`;

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
            { role: "system", content: "You create engaging Instagram posts about books for readers." },
            { role: "user", content: prompt }
          ],
          temperature: 0.8
        })
      });

      const data = await response.json();
      selectedPostContent = data.choices[0].message.content.trim();
      showPreview(book, selectedPostContent);

    } catch (error) {
      console.error('Error generating post:', error);
      alert('Failed to generate post. Please try again.');
    }
  }

  function showPreview(book, content) {
    previewContent.innerHTML = `
      <img src="${book.img}" alt="${book.title}" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
      <strong>${book.title}</strong>
      <p style="margin-top:10px;">${content}</p>
    `;
    previewModal.style.display = 'block';
  }

  function savePost(book, content) {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    const newPost = {
      title: book.title,
      img: book.img,
      text: content,
      likes: 0
    };
    savedPosts.push(newPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    renderFeed();
  }

  function renderFeed() {
    postFeed.innerHTML = '';
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    savedPosts.forEach((post, index) => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <img src="${post.img}" alt="${post.title}">
        <div class="post-content">
          <strong>${post.title}</strong>
          <p>${post.text}</p>
          <button class="like-button" data-index="${index}">❤️ ${post.likes}</button>
        </div>
      `;
      postFeed.appendChild(card);
    });

    // Like system
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const saved = JSON.parse(localStorage.getItem('savedPosts')) || [];
        const idx = this.getAttribute('data-index');
        saved[idx].likes++;
        localStorage.setItem('savedPosts', JSON.stringify(saved));
        renderFeed(); // Re-render
      });
    });
  }

  // Initial load
  renderFeed();
});
