import React, {useState} from 'react'
import './App.css'
import Question from './components/Question'

export default function App(){
  const [quizScreen, setQuizScreen] = useState(false)
  const [formData, setFormData] = useState({
    numberOfQuestions: '',
    category: "",
    difficulty: ""
})
// test
function handleChange(event) {
  const {name, value, type, checked} = event.target
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name] : type === 'checkbox' ? checked : value
      }
  })
}
  
  const goBack = () => {
    setQuizScreen(prevScreen =>!prevScreen)
  }

 const handleSubmit = (event) => {
    event.preventDefault();
    setQuizScreen(prevScreen => !prevScreen)

 }
  return (
    <main>
      {quizScreen && <button className="go-back" onClick={goBack}>Go back</button>}
      <div className="start-screen">
            <h1 className="start-screen--title">Quizzical</h1>
            <br />
            {quizScreen === false &&<p className="start-screen--description">Select your settings!</p>}
           
           
        </div>
      {quizScreen === false && <form onSubmit={handleSubmit}>
                <select 
                    id="numberOfQuestions"
                    value={formData.numberOfQuestions}
                    onChange={handleChange}
                    name="numberOfQuestions"
                >
                        <option vlaue="">-- How many questions? --</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>

                </select>
               
              
                <br />
                
                
                <br />
                <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                    >
                        <option vlaue="">-- Choose quiz category --</option>
                        <option value="12">Music</option>
                        <option value="11">Film</option>
                        <option value="26">Celebrities</option>
                        <option value="23">History</option>
                        <option value="25">Art</option>
                    </select>
                    <br />
                    <br />
                    <fieldset>
                        <legend>Select difficulty</legend>
                        <input 
                            type="radio"
                            id="easy"
                            name="difficulty"
                            value="easy"
                            onChange={handleChange}
                            checked={formData.difficulty === "easy"}
                        />
                        <label htmlFor="easy">Easy</label>
                        <br />
                        <input 
                            type="radio"
                            id="medium"
                            name="difficulty"
                            value="medium"
                            onChange={handleChange}
                            checked={formData.difficulty === "medium"}
                        />
                        <label htmlFor="medium">Medium</label>
                        <br />
                        <input 
                            type="radio"
                            id="hard"
                            name="difficulty"
                            value="hard"
                            onChange={handleChange}
                            checked={formData.difficulty === "hard"}
                        />
                        <label htmlFor="hard">Hard</label>
                    </fieldset>
                    <button className="start-screen--button" onClick={handleSubmit}>Start quiz</button>
            </form>}
      {quizScreen && <Question formData={formData} />}
    </main>
  )
}