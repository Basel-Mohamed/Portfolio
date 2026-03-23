fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Who are you?",
    chat_history: [],
    preamble: "You are a helpful assistant.",
    temperature: 0.3
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
