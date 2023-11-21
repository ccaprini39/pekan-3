'use server'

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();


const directory = path.resolve("/");
console.log('directory', directory);
const speechFile = path.resolve("/new-speech-2.mp3");

export async function getSpeech() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

export async function createSpeech(text: string) {
  const options = [
    'alloy', //female
    'echo', //soft beta male
    'fable', //androgynous brit
    'onyx', //strong man
    'nova', //computer sounding worman
    'shimmer', //strong sounding female, slightly robotic
  ]
  const speechFile = path.resolve(process.cwd(), 'new-speech-2.mp3')
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

//this will take an mp3 file name, find the corresponding file, and serve it
//the file will have been created with the createSpeech function
export async function serveSpeech(filename: string) {
  try {
    const speechFile = path.resolve(process.cwd() + "/" + filename);
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
    const speechFile = path.resolve(process.cwd() + "/new-speech.mp3");
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