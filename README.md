# 🚀 JavaScript Practice App

A fun, AI-powered JavaScript practice tool with less then 200 lines of code that generates coding challenges and provides intelligent feedback on your solutions. 

![App Demo](Generation.gif)

## 📖 What is this?

Ever wanted to practice JavaScript but got tired of the same old boring exercises? This app uses Google's Gemini AI to generate fresh, randomized JavaScript coding challenges tailored for web development. Write your solution, submit it, and get instant AI-powered feedback on whether you got it right!

Think of it as your personal JavaScript tutor that never runs out of new problems to solve.

## ✨ Features

- **AI-Generated Questions**: Get unique JavaScript challenges every time you use the app
- **Smart Verification**: AI analyzes your code and provides detailed feedback
- **Web-Focused**: Challenges are specifically designed for web-based JavaScript
- **Clean Terminal UI**: Retro black-and-white interface 

## 🎮 How to Use

1. **Start the App**: Open `index.html` in your browser
2. **Read the Challenge**: A new JavaScript problem will be generated automatically
3. **Write Your Solution**: Type your code in the provided textarea
4. **Submit**: Click the "Submit" button to have your answer verified
5. **Get Feedback**: The AI will tell you if you're correct and show you the right solution if needed
6. **Next Challenge**: Click "Next" to get a brand new problem to solve
7. **Repeat**: Keep practicing and watch your total count grow!

## 🛠️ Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key (free to get!)

### Installation

1. **Clone or Download** this repository to your computer

2. **Get a Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Create a new API key (it's free!)

3. **Configure Your API Key**:
   - Create a file called `env.js` in the root directory
   - Add your API key like this:
   ```javascript
   const apiKey = "YOUR_GEMINI_API_KEY_HERE";
   export default apiKey;
   ```
   - **Important**: Never share your API key publicly!

4. **Run the App**:
   - Simply open `index.html` in your web browser
   - That's it! No complex setup required

## 🏗️ Project Structure

```
Practice-JavaScript/
├── api/
│   └── geminiApi.js      # Handles communication with Gemini AI
├── app.css               # Styling (retro terminal look)
├── app.js                # Main application logic
├── index.html            # The web page you open
├── env.js                # Your API key (you create this)
└── LICENSE               # Project license
```

## 🎯 What Kind of Questions Will I Get?

The AI generates practical JavaScript challenges focused on:
- DOM manipulation
- Event handling
- Array and object operations
- Function creation
- Conditional logic
- Loops and iteration
- Basic web development tasks

Each question is small and focused, perfect for quick practice sessions!
## 📝 License

This project is open source - see the LICENSE file for details.