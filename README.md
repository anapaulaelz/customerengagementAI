# Memento - Customer Engagement AI Project

**Memento** is a web application designed to enhance the reading experience by combining traditional book tracking with AI-powered reflections, book recommendations, and social sharing features.  
This project was developed as part of the **Customer Engagement and Artificial Intelligence** module at the **National College of Ireland**.

## Project Overview

Memento offers readers:

- A **Dashboard** to track their reading progress, reflections, and goals.
- A **BookShop** to explore and add new books.
- A **Social** space to create, preview, and share AI-generated posts about their reading journey.
- A **Home** page that introduces the experience and offers dynamic book recommendations via AI.

All sections are interconnected through a simple and clean user interface.

## Technologies Used

- **HTML5** and **CSS3** for structure and responsive styling.
- **Vanilla JavaScript** for frontend interactivity.
- **Groq API** (LLaMA3-8B) for:
  - Book recommendations based on selected genres.
  - Thought polishing and idea expansion features.
  - Generating Instagram-style posts from books and user prompts.

## Important Notice about API Usage

> This project includes API keys exposed directly in the JavaScript files for demonstration purposes only.  
> In a real production environment, API keys should **never** be exposed on the client side.  
> For this academic submission, the API keys have been kept publicly visible to comply with the project’s objective of showcasing AI integration functionality.

All API requests are handled securely through `fetch()` and are limited to basic prompt-response interactions.

## Pages Structure

- `/index.html` → Landing page with book recommendation modal.
- `/dashboard.html` → Reading tracker, calendar, and "Garden of Thoughts" with AI features.
- `/bookshop.html` → Bookstore interface with genre filters and search functionality.
- `/social.html` → Social profile and AI-generated post creation.

## Live Demo

Access the live version here:  
[https://anapaulaelz.github.io/customerengagementAI/](https://anapaulaelz.github.io/customerengagementAI/)  
*(If not yet live, please allow a few minutes for GitHub Pages to deploy.)*

## References

- Groq API documentation
- OpenAI API conventions
- Customer Engagement and Artificial Intelligence - National College of Ireland (2024)
