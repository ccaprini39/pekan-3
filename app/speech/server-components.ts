'use server'

import fs from "fs";

const os = require('os');
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();



function getTempDirectory() {
  if (process.env.VERCEL || process.env.NOW_REGION) {
    return '/tmp/';
  }
  // For local development, check the OS
  if (os.platform() === 'win32') {
    // Windows path (adjust as needed)
    return '';
  } else {
    // Unix-like systems (Linux, macOS)
    return '/tmp/';
  }
}

type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
export async function createSpeech(text: string, inputVoice: Voice) {
  const speechFile = path.resolve(getTempDirectory(), 'new-speech-2.mp3')
  console.log('here in the create speech function')
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: inputVoice,
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

//making another function to create a speech file but it also generates and returns a file name
export async function createSpeechWithFilename(text: string, inputVoice: Voice, filename: string) {
  const speechFile = path.resolve(getTempDirectory(), filename)
  console.log('here in the create speech function')
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: inputVoice,
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  return filename;
}

//this will take an mp3 file name, find the corresponding file, and serve it
//the file will have been created with the createSpeech function
export async function serveSpeech(filename: string) {
  try {
    console.log('here in the serve speech function')
    console.log(filename);
    //check to see if filename starts with / and if it does not, add it
    // if (filename.charAt(0) != '/') {
    //   filename = '/' + filename;
    // }
    const speechFile = path.resolve(getTempDirectory() + filename);
    const stream = fs.createReadStream(speechFile);
    const chunks: any[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString('base64');
    return `data:audio/mpeg;base64,${base64}`;
  } catch (error) {
    console.log(error);
    const speechFile = path.resolve(getTempDirectory() + "new-speech.mp3");
    const stream = fs.createReadStream(speechFile);
    const chunks: any[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString('base64');
    return `data:audio/mpeg;base64,${base64}`;
  }
}