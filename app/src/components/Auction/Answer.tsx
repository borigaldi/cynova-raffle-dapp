import { useState } from 'react';

export interface AnswerProps {
    answer: string;
    onClick: (value: string) => void;
}

function Answer(props: AnswerProps) {
    return (
        <div
            className="bg-gray-100 dark:bg-gray-900 mx-6 h-10 w-auto mb-4 rounded-md flex items-center"

        >
            <input
                onClick={() => props.onClick(props.answer)}
                type="radio"
                name="answer"
                value={props.answer}
                className="ml-5 dark:bg-gray-800"
            />
            <label className="text-gray-700 dark:text-gray-400 text-lg ml-4">
                {props.answer}
            </label>
        </div>
    );
}

export interface AnswerCardProps {
    answers: string[];
}

function AnswerCard(props: AnswerCardProps) {
    const [answerResult, setAnswerResult] = useState('');
    let correct_answer = 'Solana'

    // function setAnsa(answer) {
    //     setAnswerResult(answer)
    // }

    const checkAnsa = (Ansa: string) => {
        if (Ansa === correct_answer) {
            localStorage.setItem('ansa', Ansa);
        } else {
            localStorage.setItem('ansa', Ansa);
        }

    }

    return (
        <div className="bg-gray-500 dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-2xl min-w-80 w-148 mt-50">
            <h1 className="mx-auto sm:text-2xl font-semibold text-gray-700 dark:text-gray-400 ml-4 mt-5">What does $SOL stand for?</h1>
            <div className="pt-6 pb-2">
                {props.answers.map(answer => (
                    <Answer
                        key={answer}
                        answer={answer}
                        onClick={checkAnsa}
                    />
                ))}
            </div>
        </div>
    );
}

export default AnswerCard;