# React Quiz App

A modern quiz application built with React, TypeScript, and Tailwind CSS.

## Features

- **Multiple-choice questions**: Display questions one at a time
- **Instant feedback**: Color-coded responses (green for correct, red for incorrect)
- **Score tracking**: Keep track of correct answers and display the final score
- **Review answers**: Option to review all questions and answers after completion
- **Timer functionality**: Optional countdown timer for each question
- **Restart quiz**: Option to retake the quiz after completion
- **Responsive design**: Works on mobile, tablet, and desktop devices

## Tech Stack

- React.js 
- TypeScript
- Vite (for fast development)
- Tailwind CSS (for styling)

## Project Structure

- `src/components/` - Contains React components
  - `Question.tsx` - Component to display a single question
  - `Quiz.tsx` - Main component that manages the quiz state
  - `QuizResult.tsx` - Component to display the final quiz results
- `src/data/` - Contains data files
  - `quizQuestions.ts` - Quiz questions data with TypeScript interfaces

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd quiz-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. The app will present multiple-choice questions one at a time.
2. Select an answer by clicking on one of the options.
3. Receive immediate feedback - correct answers are highlighted in green, incorrect in red.
4. The app automatically advances to the next question after a brief delay.
5. Toggle the timer functionality with the switch at the top.
6. After completing all questions, view your score and performance summary.
7. Review all questions and your answers.
8. Click "Restart Quiz" to take the quiz again.

## Customization

### Adding More Questions

You can add more questions to the quiz by editing the `src/data/quizQuestions.ts` file. Each question should follow the Question interface:

```typescript
{
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
```

### Changing Timer Duration

You can modify the timer duration by changing the `timePerQuestion` prop in the `App.tsx` file.

## License

MIT

## Acknowledgments

- Created as a project for learning React, TypeScript, and Tailwind CSS
- Inspired by various quiz applications and coding challenges
