import React, { useState } from "react";


const Gpt3Component = () => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        testAPI()
    };

    async function testAPI() {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
            },
            body: JSON.stringify({
                prompt: `${inputText} `,
                model: 'text-davinci-002',
                max_tokens: 100,
                // n: 1,
                // stop: null,
                // temperature: 0.7
            }),
        });

        const data = await response.json();
        setOutputText(data.choices[0].text)
        // setOutputText(data);

        console.log(data)
        console.log(data.choices[0].text.trim())
        return outputText;
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter some text:
                    <input type="text" value={inputText} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>{outputText}</div>
        </div>
    );
};

export default Gpt3Component;
