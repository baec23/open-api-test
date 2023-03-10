import axios from 'axios';
import { useState } from 'react';

const systemPrompt1 =
    'You are a helpful teacher explaining to language learners. ' +
    'Do not use difficult language in your explanations. ' +
    'You will be asked about English words. ' +
    'When asked about an English word, give the definition and if it has strong connotation, explain the connotation as well. ' +
    'Include an estimated difficulty level of the word on a scale from 1-10. Also give two example sentences in English using the word. ' +
    'Respond in Korean as a bulleted list';
const systemPrompt2 =
    'You are a teacher helping Korean students who are preparing for the TOEIC exam. ' +
    'You will be given an English word or phrase. ' +
    'Format your response as a JSON object with the following keys: definition, extraDetails, example1, example2, synonyms. This object must be formatted exactly as specified.' +
    '"definition" should contain a concise definition of the word in Korean. ' +
    '"extraDetails" should explain situations where this word or phrase commonly appears as well as connotation. ' +
    '"example1" and "example2" should contain example TOEIC questions that may appear on the exam using this word or phrase in English. ' +
    '"synonyms" should contain an array of English synonyms. ';
function App() {
    const headers = {
        Authorization:
            'Bearer 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'
    };
    const axi = axios.create({
        baseURL: 'https://api.openai.com/v1/chat/completions',
        headers: headers
    });

    let messages = [
        {
            role: 'system',
            content: systemPrompt2
        },
        {
            role: 'user',
            content: '한국어로 대답 해 주세요.'
        }
    ];
    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages
    };

    const [queryText, setQueryText] = useState('');

    const [responseText, setResponseText] = useState('');

    return (
        <div className="flex flex-col p-20">
            <label>What do you want to ask?</label>
            <textarea
                className="bg-neutral-100 rounded shadow p-2 mb-5"
                value={queryText}
                onChange={(e) => {
                    setQueryText(e.target.value);
                }}
            />
            <button
                className="rounded bg-blue-400 text-white font-semibold py-2 px-5 w-fit self-center"
                onClick={(e) => {
                    messages.push({ role: 'user', content: queryText });
                    console.log(data);
                    axi.post('', data, {
                        headers: headers
                    }).then((response) => {
                        setResponseText(
                            response.data.choices[0].message.content
                        );
                    });
                }}
            >
                Ask
            </button>
            <p className="text-lg mt-10">{responseText}</p>
        </div>
    );
}

export default App;
