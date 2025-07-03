import { ask } from './api/geminiApi.js'

const app = {

    submitButton: null,
    code: null,
    question: null,
    content: null,
    pastQuestions: "",
    firstQuestion: true,

    stats: {
        total: 0,
    },

    async init() {
        console.log("app initialized");


        app.submitButton = document.getElementById("submitButton")
        app.question = document.getElementById("question")
        app.total = document.getElementById("total")

        if (!this.submitButton) {
            console.error("submitButton not found. Current value:", this.submitButton);
            return
        }



        if (!this.question) return

        if (!app.total) return

        app.stats = JSON.parse(localStorage.getItem("stats")) || { total: 0 }

        app.total.textContent = app.stats.total.toString()

        console.log("total:", app.stats.total)

        console.log("succesfully got required elements")
        app.submitButton.addEventListener("click", app.handleSubmit)
        if (app.firstQuestion) app.submitButton.textContent = "Submit"
        else app.submitButton.textContent = "Generating..."

        app.isVerifyMode = true

        const generatedQuestion = await ask("Generate the user a simple plain javascript snippet with a problem for the user to solve make it small and simple, it should focus on web based javascript, format your response to go inside a html div, make the outer most div have class='question-response', black background and white color text styling, put a textarea with id='code' for the users to write their code in, here are the past questions make sure not to repeats these" + app.pastQuestions)
        app.question.innerHTML = generatedQuestion

        app.pastQuestions += generatedQuestion + "\n"

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

        app.submitButton.textContent = "Verifying..."

        if (!app.question) {
            console.error("Question element not found.");
            return
        }

        await new Promise(resolve => {
            app.code = document.getElementById("code");
            resolve();
        });

        if (!app.code || !app.code.value) {
            console.error("Code element not found or empty.");
            return
        }

        console.log("Verifying answer...");

        const correct = await ask(`${app.question.innerHTML}\nUser's code:\n${app.code.value}\nVerify if the question has been correctly answered make sure to say CORRECT! or INCORRECT! based if the users input was correct or not,format your response in html, make the outer most div contain class="question-response", black background and white color text styling, make sure to always show the users incorrect code and the correct code`);

        app.question.innerHTML = correct

        await new Promise(resolve => setTimeout(resolve, 1000));
        app.submitButton.textContent = "Next"
        app.isVerifyMode = false

        app.stats.total += 1
        app.total.textContent = app.stats.total.toString()

        localStorage.setItem("stats", JSON.stringify(app.stats))

        app.firstQuestion = false
    }
}

document.addEventListener("DOMContentLoaded", () => app.init());
