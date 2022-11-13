const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")

const { LoremIpsum } = require("lorem-ipsum")
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
}, 'html', '<br/>')


const app = express()

//define middle ware
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//our express api part start
app.get('/api', (request, response) => {
    response.json({ message: 'success' })
})

//for paragraphs
app.get('/api/paragraphs/:count?', (request, response) => {
    const { count } = request.params
    const paragraph = lorem.generateParagraphs(count ? parseInt(count) : 1);
    response.json({ paragraph })
})

//for sentences
app.get('/api/sentences/:count?', (request, response) => {
    const { count } = request.params
    const sentences = lorem.generateSentences(count ? parseInt(count) : 1);
    response.json({ sentences })
})

//for words
app.get('/api/words/:count?', (request, response) => {
    const { count } = request.params
    const words = lorem.generateWords(count ? parseInt(count) : 1);
    response.json({ words })
})




//our express api part close


//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
})