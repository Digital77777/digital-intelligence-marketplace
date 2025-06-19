import React from "react";
import { BookOpen, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How can I fix a bug in my code?",
    answer: "Describe your bug and paste your code. The assistant will suggest step-by-step fixes.",
  },
  {
    question: "What does this error mean?",
    answer: "Paste the error message and relevant code. The assistant will explain and offer solutions.",
  },
  {
    question: "Can you refactor my function?",
    answer: "Paste your function and describe your refactoring goals. The assistant will rewrite it for clarity or performance.",
  },
];

const QuickHelp: React.FC = () => {
  return (
    <Card className="w-full md:w-80 h-fit min-h-[240px] shadow">
      <CardContent className="pt-3 px-4 pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-purple-700 dark:text-violet-300">
          <BookOpen className="h-5 w-5" /> Quick Help
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
          {faqs.map(({ question, answer }) => (
            <li key={question}>
              <span className="font-medium">{question}</span>
              <br />
              <span className="text-gray-500 dark:text-gray-400">{answer}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <Lightbulb className="h-4 w-4" />
          Pro tip: Share code snippets for fastest results.
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickHelp;
