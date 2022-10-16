import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

interface OpenAI {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
  // props: any;
}

const Home: React.FC<OpenAI> = (props) => {
  const CHARACTER_LIMIT: number = 128;

  // const ENDPOINT: string =
  //   'https://kj3y0mxhv5.execute-api.us-east-1.amazonaws.com/prod/generate_snippet';

    const ENDPOINT: string =
    'http://127.0.0.1:8000/codex_snippet';

  const [prompt, setPrompt] = React.useState('');
  const [snippet, setSnippet] = React.useState('');

  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    console.log('submitting: ' + prompt);
    // callApi();
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    setSnippet(data.snippet);
    // setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt(''); // reset the prompt
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  // here is where you can change the front end suggested prompt limit
  // const isPromptValid = props.prompt.length < props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = 'text-slate-500';
  let statusText = null;
  // if (!isPromptValid) {
  //   statusColor = 'text-red-400';
  //   statusText = `Input must be less than ${props.characterLimit} characters.`;
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our Project!</h1>

        <h2>OpenAI Whisper Hackathon</h2>

        <div className='line'></div>

        <div className='audio-container'>
          <div className='audio-upload-container'>
            <label htmlFor='audio-upload'>Upload Audio File</label>
            <input type='audio' name='audio-upload' id='audio-upload' />
            <br className='mt-2'></br>
            <div>
              {/* disable the button if the prompt is over the limit */}
              <button
                className='bg-gradient-to-r from-red-400 to-pink-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
                onClick={props.onSubmit}
                // disabled={props.isLoading || !isPromptValid}
              >
                Submit
              </button>
            </div>
          </div>
          <div className='live-recording'>
            <button
              className='bg-gradient-to-r from-red-400 to-pink-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
              onClick={props.onSubmit}
              // disabled={props.isLoading || !isPromptValid}
            >
              Record Live!
            </button>
          </div>
        </div>

        {/* Three sections */}
        <div id='output-boxes' className={styles.grid}>
          <div className='text-output'>
            <h3>Text Output</h3>
            <p id='key-text'></p>
            <div className='large-box'></div>
          </div>
          <div className='code-output'>
            <h3>Code Output</h3>
            <p id='key-code'></p>
            <div className='large-box'></div>
          </div>
          <div className='code-conversion'>
            <h3>Code Conversion</h3>
            <p id='code-converted'></p>
            <div className='large-box'></div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
