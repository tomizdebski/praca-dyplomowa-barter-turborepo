import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @UseGuards(AuthGuard)
  getQuestions(
    @Query('count') count: string, // liczba pytań
    @Query('topic') topic: string, // temat pytań
  ) {
    const numQuestions = parseInt(count);

    // Walidacja parametrów
    if (isNaN(numQuestions) || numQuestions <= 0) {
      throw new BadRequestException(
        'Invalid count parameter. Must be a positive number.',
      );
    }
    if (!topic || topic.trim() === '') {
      throw new BadRequestException('Topic parameter is required.');
    }

    // Pobierz pytania z serwisu
    return this.quizService.getQuestionsByTopic(topic, numQuestions);
  }
}
