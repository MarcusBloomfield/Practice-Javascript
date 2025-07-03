import { ask } from './api/geminiApi.js'

const app = {

    submitButton: null,
    code: null,
    question: null,
    content: null,

    async init() {
        console.log("app initialized");

        this.submitButton = document.getElementById("submitButton")
        this.code = document.getElementById("code")
        this.question = document.getElementById("question")

        if (!this.submitButton) {
            console.error("submitButton not found. Current value:", this.submitButton);
            return
        }
        if (!this.code) return
        if (!this.question) return

        console.log("succesfully got required elements")
        app.submitButton.addEventListener("click", app.handleSubmit)
        app.submitButton.textContent = "Submit"
        app.isVerifyMode = true

        const content = await ask("Generate the user a simple plain javascript snippet with a problem for the user to solve make it small and simple, it should focus on web based javascript, format your response to go inside a html div, make the outer most div have class='question-response'")
        this.question.innerHTML = content
    },

    handleSubmit() {
        if (app.isVerifyMode) {
            app.verifyAnswer()
        } else {
            app.init()
        }
    },
    async verifyAnswer() {

        console.log("submitButton pressed")
        console.log("app.question:", app.question);
        console.log("app.code:", app.code);
        console.log("app.submitButton:", app.submitButton);

        if (!app.question) {
            console.error("Question element not found.");
            return
        }

        if (!app.code || !app.code.value) {
            console.error("Code element not found or empty.");
            return
        }

        console.log("Verifying answer...");

        const correct = await ask(`${app.question.innerHTML}\nUser's code:\n${app.code.value}\nVerify if the question has been correctly answered make sure to say CORRECT! or INCORRECT! based if the users input was correct or not,format your response in html, make the outer most div contain class="question-response"`);

        app.question.innerHTML = correct

        await new Promise(resolve => setTimeout(resolve, 1000));
        app.submitButton.textContent = "Next"
        app.isVerifyMode = false
    }
}

document.addEventListener("DOMContentLoaded", () => app.init());
