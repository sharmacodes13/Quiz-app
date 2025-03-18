# React Quiz App

A modern quiz application built with React and Tailwind CSS.

## Features

- **Multiple-choice questions**: Display questions one at a time
- **Instant feedback**: Color-coded responses (green for correct, red for incorrect)
- **Score tracking**: Keep track of correct answers and display the final score
- **Review answers**: Option to review all questions and answers after completion
- **Timer functionality**: Optional countdown timer for each question
- **Restart quiz**: Option to retake the quiz after completion
- **Responsive design**: Works on mobile, tablet, and desktop devices
- **Beautiful UI**: Gradient blue theme for a pleasant user experience

## Tech Stack

- React.js 
- JavaScript
- Vite (for fast development)
- Tailwind CSS (for styling)

## Project Structure

- `src/components/` - Contains React components
  - `Question.jsx` - Component to display a single question
  - `Quiz.jsx` - Main component that manages the quiz state
  - `QuizResult.jsx` - Component to display the final quiz results
- `src/data/` - Contains data files
  - `quizQuestions.js` - Quiz questions data

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

4. Open your browser and navigate to the local URL displayed in the terminal (usually `http://localhost:5173`)

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

You can add more questions to the quiz by editing the `src/data/quizQuestions.js` file. Each question should follow this structure:

```javascript
{
  id: number,
  question: string,
  options: [string, string, ...],
  correctAnswer: string
}
```

### Changing Timer Duration

You can modify the timer duration by changing the `timePerQuestion` prop in the `App.jsx` file.

## License

MIT

## Acknowledgments

- Created as a project for learning React and Tailwind CSS
- Features a beautiful blue gradient theme throughout the application
