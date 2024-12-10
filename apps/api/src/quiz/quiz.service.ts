import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  getQuestionsByTopic(topic: string, numQuestions: number) {
    return `Getting ${numQuestions} questions for topic ${topic}`;
  }
}
