export default async function testAPI(input) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      prompt: `${input}, tell me the difficulty of this task on a scale from 1-10, where 1 is lowest and 10 is highest, only display the number difficulty. `,
      model: "text-davinci-002",
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const outputData = data.choices[0].text;
  return outputData;
}
