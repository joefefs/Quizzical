import React, {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'

export default function Question(props){
    const [questions, setQuestions] = useState([])

    useEffect(function() {
   
    fetch(`https://opentdb.com/api.php?amount=${props.formData.numberOfQuestions}&category=${props.formData.category}&difficulty=${props.formData.difficulty}&type=multiple`)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(
                data.results.map((question) => ({
                    id: nanoid(),
                    ...question,
                    answers: [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ].sort(()=> Math.random() - 0.5)
                }))
            )
        })
    },[]);

    const selectAnswer = (question) => (event) =>{
        event.target.id === question.correct_answer 
            ? console.log("correct") 
            : console.log("Incorrect, the answer is: " + question.correct_answer)

        setQuestions((questions) =>
            questions.map((el)=>
                el.id === question.id
                    ? {
                        ...el,
                        answered: event.target.id,
                        isCorrect: event.target.id === question.correct_answer
                    }
                   : el
            )
        )
    }

    return (
        <div>
            {questions.map((question)=> {
                return(
                    <div key={questions.id} className='question--container'>
                        <h3 className='question' dangerouslySetInnerHTML={{__html: question.question }} />
                        <div key={nanoid()} className="question--answer-container">{question.answers.map((answer)=> (
                            <p
                                key={answer}
                                id={answer}
                                onClick={selectAnswer(question)}
                                className={[
                                    "question--answers",
                                    question.answered === answer &&
                                    (question.isCorrect ? "correct" : "incorrect")
                                ]
                                .filter(Boolean)
                                .join(" ")}
                                >
                                {answer}</p>
                        ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}