export const mockQuizData = {
    questions: [
      {
        id: 1,
        text: "React is a JavaScript library for building user interfaces.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: 2,
        text: "Which of the following is not a React hook?",
        type: "multiple-choice",
        options: ["useState", "useEffect", "useContext", "useReactState"],
        correctAnswer: "useReactState"
      },
      {
          id: 3,
          text: "What is the purpose of the useEffect hook in React?",
          type: "multiple-choice",
          options: [
            "To manage state in functional components",
            "To perform side effects in functional components",
            "To create custom hooks",
            "To optimize rendering performance"
          ],
          correctAnswer: "To perform side effects in functional components"
        },
        {
          id: 4,
          text: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: "True"
        },
        {
          id: 5,
          text: "Which method is used to render a React component to the DOM?",
          type: "multiple-choice",
          options: [
            "ReactDOM.render()",
            "React.createElement()",
            "component.mount()",
            "React.renderComponent()"
          ],
          correctAnswer: "ReactDOM.render()"
        }
      // Add more questions as needed
    ],
    totalTime: 300, // 5 minutes in seconds
  };