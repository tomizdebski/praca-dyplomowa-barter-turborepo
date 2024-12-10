import { Injectable } from '@nestjs/common';
import { QUIZ } from './db_json';

@Injectable()
export class QuizService {
  getQuestionsByTopic(topic: string, numQuestions: number) {
    const quiz = QUIZ[topic.toUpperCase()];
    if (!quiz) {
      return `No questions found for topic ${topic}`;
    }
    console.log(quiz);
    return `Getting ${numQuestions} questions for topic ${topic}`;
  }
}
