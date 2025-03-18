export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen"
  },
  {
    id: 6,
    question: "What is the main language used for building web applications with React?",
    options: ["Java", "C++", "Python", "JavaScript"],
    correctAnswer: "JavaScript"
  },
  {
    id: 7,
    question: "Which of these is NOT a programming paradigm?",
    options: ["Object-Oriented", "Functional", "Procedural", "Alphabetical"],
    correctAnswer: "Alphabetical"
  },
  {
    id: 8,
    question: "Who is considered the father of modern computer science?",
    options: ["Alan Turing", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
    correctAnswer: "Alan Turing"
  }
];

export default quizQuestions; 