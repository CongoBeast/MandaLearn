import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Spinner, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import './App.css';
import About from './About';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = 'AIzaSyDhfeanHiRbyV0Vyrp7_YSgfvN5NTzY_PI';

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            { text: 'I will send you a word or a sentence in English and you will translate it for me. Then you will give the character and the pin yin and an example of a sentence you can use the word in.' },
          ],
        },
        {
          role: 'model',
          parts: [
            { text: "I'm ready! Send me your word or sentence. 😊 \n" },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(inputText);
    setOutputText(result.response.text());
    setLoading(false);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <Router>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="8">
            <div className="text-center mb-4">
              <Link to="/" className="btn btn-primary mr-2">Home</Link>
              <Link to="/about" className="btn btn-secondary">About</Link>
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-center mb-4">Generative AI Translator</h1>
                    <Form.Group controlId="inputText">
                      <Form.Label>Enter text:</Form.Label>
                      <Form.Control
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Enter text here"
                      />
                    </Form.Group>
                    <div className="text-center mt-3">
                      <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{' '}
                            Translating...
                          </>
                        ) : (
                          'Translate'
                        )}
                      </Button>{' '}
                      <Button variant="secondary" onClick={handleClear} disabled={loading}>
                        Clear
                      </Button>
                    </div>
                    {outputText && (
                      <Card className="mt-4">
                        <Card.Body>{outputText}</Card.Body>
                      </Card>
                    )}
                  </>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
