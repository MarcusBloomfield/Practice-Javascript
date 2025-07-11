import { ask } from './api/geminiApi.js'

const app = {
    // DOM Elements
    submitButton: null,
    questionContainer: null,
    totalDisplay: null,
    codeInput: null,

    // Application State
    currentQuestion: "",
    pastQuestions: "",
    stats: { total: 0 },
    isWaitingForAnswer: false,

    async init() {
        console.log("Initializing JavaScript Quiz App...");
        
        this.setupDOMElements();
        this.loadStats();
        this.setupEventListeners();
        
        await this.generateNewQuestion();
        
        console.log("App initialization complete");
    },

    setupDOMElements() {
        console.log("Setting up DOM elements...");
        
        this.submitButton = document.getElementById("submitButton");
        this.questionContainer = document.getElementById("question");
        this.totalDisplay = document.getElementById("total");
        
        if (!this.submitButton || !this.questionContainer || !this.totalDisplay) {
            console.error("Required DOM elements not found");
            throw new Error("Missing required DOM elements");
        }
        
        console.log("DOM elements successfully retrieved");
    },

    loadStats() {
        console.log("Loading user statistics...");
        
        const savedStats = localStorage.getItem("stats");
        this.stats = savedStats ? JSON.parse(savedStats) : { total: 0 };
        this.totalDisplay.textContent = this.stats.total.toString();
        
        console.log(`Loaded stats - Total questions: ${this.stats.total}`);
    },

    setupEventListeners() {
        console.log("Setting up event listeners...");
        
        this.submitButton.addEventListener("click", () => this.handleSubmit());
        
        console.log("Event listeners configured");
    },

    async generateNewQuestion() {
        console.log("Generating new question...");
        
        this.submitButton.textContent = "Generating...";
        this.isWaitingForAnswer = false;
        
        const questionPrompt = `Generate a simple JavaScript web development problem. 
                               Format as HTML with class='question-response', black background, white text.
                               Include a textarea with id='code' for user input.
                               Previous questions to avoid repeating: ${this.pastQuestions}`;
        
        try {
            this.currentQuestion = await ask(questionPrompt);
            this.questionContainer.innerHTML = this.currentQuestion;
            this.pastQuestions += this.currentQuestion + "\n";
            
            this.submitButton.textContent = "Submit Answer";
            this.isWaitingForAnswer = true;
            
            console.log("New question generated successfully");
        } catch (error) {
            console.error("Failed to generate question:", error);
            this.questionContainer.innerHTML = "<div class='question-response'>Error generating question. Please try again.</div>";
        }
    },

    async handleSubmit() {
        console.log("Submit button clicked");
        
        if (this.isWaitingForAnswer) {
            await this.verifyAnswer();
        } else {
            await this.generateNewQuestion();
        }
    },

    async verifyAnswer() {
        console.log("Verifying user answer...");
        
        this.submitButton.textContent = "Verifying...";
        
        // Get user code input
        this.codeInput = document.getElementById("code");
        
        if (!this.codeInput || !this.codeInput.value.trim()) {
            console.warn("No code provided by user");
            alert("Please enter your code before submitting.");
            this.submitButton.textContent = "Submit Answer";
            return;
        }
        
        const userCode = this.codeInput.value;
        console.log(`User submitted code: ${userCode.substring(0, 50)}...`);
        
        const verificationPrompt = `${this.currentQuestion}
                                   User's code: ${userCode}
                                   Verify if correct. Respond with "CORRECT!" or "INCORRECT!" 
                                   Format as HTML with class='question-response', black background, white text.
                                   Show both user code and correct solution.`;
        
        try {
            const verificationResult = await ask(verificationPrompt);
            this.questionContainer.innerHTML = verificationResult;
            
            this.updateStats();
            this.submitButton.textContent = "Next Question";
            this.isWaitingForAnswer = false;
            
            console.log("Answer verification complete");
        } catch (error) {
            console.error("Failed to verify answer:", error);
            this.questionContainer.innerHTML = "<div class='question-response'>Error verifying answer. Please try again.</div>";
            this.submitButton.textContent = "Submit Answer";
        }
    },

    updateStats() {
        console.log("Updating user statistics...");
        
        this.stats.total += 1;
        this.totalDisplay.textContent = this.stats.total.toString();
        localStorage.setItem("stats", JSON.stringify(this.stats));
        
        console.log(`Stats updated - Total questions completed: ${this.stats.total}`);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, starting app...");
    app.init().catch(error => {
        console.error("App initialization failed:", error);
    });
});
