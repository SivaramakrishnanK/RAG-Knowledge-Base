// Node.js Express backend for RAG Q&A (ES module syntax)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Backend is working!'));

// Simulated codebook guidelines
const codebook = {
    stringConcatenation: {
        preferred: 'Use string interpolation `${}` syntax.',
        notAllowed: 'Avoid using + for string concatenation.'
    },
    safeNavigation: {
        preferred: 'Use the safe navigation operator `?.` for nested object access.',
        notAllowed: 'Do not use `&&` chaining for nested object access.'
    },
    asyncAwait: {
        preferred: 'Use .then()/.catch() for Promises in frontend code.',
        notAllowed: 'Do not use async/await in frontend (Angular) code.'
    },
    hasOwnProperty: {
        preferred: 'Use safe navigation operator or object structure validation.',
        notAllowed: 'Do not use hasOwnProperty directly.'
    },
    variableNaming: 'Use descriptive names and follow camelCase for variables, PascalCase for classes.',
    methodConvention: 'Use documented method structure and arrow functions over anonymous function expressions.',
    codeComments: 'Comments should be local and helpful. Do not leave removed code as comments.',
    linting: 'ESLint must be enabled. Do not disable linting rules.',
    performance: 'Review for performance issues and reuse code as much as possible.',
    repetitiveLogic: 'Avoid repetitive if/else; use switch/case or object mapping.',
    cypressId: 'Use unique ids for Cypress testing, with dash-separated naming.',
    unitTest: 'Include unit tests for new/modified functions, using the provided format.'
};

// RAG logic: checks question against codebook and returns relevant answer
app.post('/api/ask', (req, res) => {
    const { question } = req.body;
    let answer = "Sorry, I couldn't find an answer in the coding conventions.";

    switch (true) {
        case /user && user\.profile && user\.profile\.email/.test(question):
            answer = `${codebook.safeNavigation.notAllowed}\n${codebook.safeNavigation.preferred}\nExample:\n// ✅ Preferred\nconst email = user?.profile?.email;\n// ❌ Not Allowed\nconst email = user && user.profile && user.profile.email;`;
            break;
        case /string concatenation|interpolation|\$\{/.test(question):
            answer = `${codebook.stringConcatenation.preferred}\nExample:\nconst preferredMethod = \`${'${hi} ${name}'}\`;`;
            break;
        case /async\/await|promise|then|catch/.test(question):
            answer = `${codebook.asyncAwait.notAllowed}\n${codebook.asyncAwait.preferred}\nExample:\nsomeServiceCall().then(result => {\n    // handle result\n}).catch(error => {\n    // handle error\n});`;
            break;
        case /hasOwnProperty/.test(question):
            answer = `${codebook.hasOwnProperty.notAllowed}\n${codebook.hasOwnProperty.preferred}\nExample:\nif (config?.settings?.enabled) {\n    // logic here\n}`;
            break;
        case /variable naming|camelCase|PascalCase/.test(question):
            answer = codebook.variableNaming;
            break;
        case /method|arrow function/.test(question):
            answer = codebook.methodConvention;
            break;
        case /comment/.test(question):
            answer = codebook.codeComments;
            break;
        case /lint|eslint/.test(question):
            answer = codebook.linting;
            break;
        case /performance/.test(question):
            answer = codebook.performance;
            break;
        case /switch|object mapping|repetitive/.test(question):
            answer = codebook.repetitiveLogic;
            break;
        case /cypress|id/.test(question):
            answer = codebook.cypressId;
            break;
        case /unit test|test case/.test(question):
            answer = codebook.unitTest;
            break;
    }

    res.json({ answer });
});

app.listen(3001, () => {
    // No console.log per company guidelines
});
