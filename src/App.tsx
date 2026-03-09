import { useMemo, useState } from 'react'
import './App.css'

type LetterItem = {
  upper: string
  lower: string
  word: string
  emoji: string
}

const letters: LetterItem[] = [
  { upper: 'A', lower: 'a', word: 'ape', emoji: '🐒' },
  { upper: 'B', lower: 'b', word: 'bil', emoji: '🚗' },
  { upper: 'C', lower: 'c', word: 'campingvogn', emoji: '🚐' },
  { upper: 'D', lower: 'd', word: 'drage', emoji: '🐉' },
  { upper: 'E', lower: 'e', word: 'elefant', emoji: '🐘' },
  { upper: 'F', lower: 'f', word: 'fisk', emoji: '🐟' },
  { upper: 'G', lower: 'g', word: 'gris', emoji: '🐷' },
  { upper: 'H', lower: 'h', word: 'hus', emoji: '🏠' },
  { upper: 'I', lower: 'i', word: 'is', emoji: '🍦' },
  { upper: 'J', lower: 'j', word: 'jordbær', emoji: '🍓' },
  { upper: 'K', lower: 'k', word: 'katt', emoji: '🐱' },
  { upper: 'L', lower: 'l', word: 'løve', emoji: '🦁' },
  { upper: 'M', lower: 'm', word: 'måne', emoji: '🌙' },
  { upper: 'N', lower: 'n', word: 'nese', emoji: '👃' },
  { upper: 'O', lower: 'o', word: 'ost', emoji: '🧀' },
  { upper: 'P', lower: 'p', word: 'pingvin', emoji: '🐧' },
  { upper: 'Q', lower: 'q', word: 'quiz', emoji: '❓' },
  { upper: 'R', lower: 'r', word: 'rev', emoji: '🦊' },
  { upper: 'S', lower: 's', word: 'sol', emoji: '☀️' },
  { upper: 'T', lower: 't', word: 'tog', emoji: '🚂' },
  { upper: 'U', lower: 'u', word: 'ugle', emoji: '🦉' },
  { upper: 'V', lower: 'v', word: 'vaffel', emoji: '🧇' },
  { upper: 'W', lower: 'w', word: 'wok', emoji: '🥘' },
  { upper: 'X', lower: 'x', word: 'xylofon', emoji: '🎵' },
  { upper: 'Y', lower: 'y', word: 'yoghurt', emoji: '🥣' },
  { upper: 'Z', lower: 'z', word: 'zebra', emoji: '🦓' },
  { upper: 'Æ', lower: 'æ', word: 'ærfugl', emoji: '🪿' },
  { upper: 'Ø', lower: 'ø', word: 'øye', emoji: '👁️' },
  { upper: 'Å', lower: 'å', word: 'ål', emoji: '🐍' },
]

const randomIndex = () => Math.floor(Math.random() * letters.length)

function App() {
  const [selected, setSelected] = useState<LetterItem>(letters[0])
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState('Trykk på riktig bokstav!')
  const [correctCount, setCorrectCount] = useState(0)
  const [targetIndex, setTargetIndex] = useState(() => randomIndex())

  const target = letters[targetIndex]

  const options = useMemo(() => {
    const indexes = new Set<number>([targetIndex])

    while (indexes.size < 4) {
      indexes.add(randomIndex())
    }

    return [...indexes]
      .map((index) => letters[index])
      .sort(() => Math.random() - 0.5)
  }, [targetIndex, round])

  const startNewRound = () => {
    setRound((current) => current + 1)
    setTargetIndex(randomIndex())
  }

  const handleGuess = (letter: LetterItem) => {
    if (letter.upper === target.upper) {
      setFeedback(`Hurra! ${target.upper} er for ${target.word}.`)
      setCorrectCount((count) => count + 1)
      setSelected(letter)
      startNewRound()
      return
    }

    setFeedback(`Nesten! Finn bokstaven ${target.upper}.`)
  }

  const resetGame = () => {
    setCorrectCount(0)
    setFeedback('Trykk på riktig bokstav!')
    setSelected(letters[0])
    setTargetIndex(randomIndex())
    setRound((current) => current + 1)
  }

  return (
    <main className="app-shell">
      <section className="hero card-soft">
        <div>
          <p className="eyebrow">ABC-spill på norsk</p>
          <h1>Lær bokstavene fra A til Å</h1>
          <p className="lead">
            Se hele det norske alfabetet, trykk på bokstavkort og lek med en liten quiz.
          </p>
        </div>
        <div className="hero-badge">
          <span className="hero-emoji">🌈</span>
          <span>29 bokstaver</span>
        </div>
      </section>

      <section className="content-grid">
        <article className="card-soft spotlight">
          <p className="section-label">Bokstaven vi ser på</p>
          <div className="letter-bubble">{selected.upper}</div>
          <p className="letter-lowercase">liten bokstav: {selected.lower}</p>
          <p className="word-example">
            {selected.emoji} <strong>{selected.word}</strong>
          </p>
          <p className="hint">Trykk på et kort under for å bytte bokstav.</p>
        </article>

        <article className="card-soft quiz-panel">
          <div className="quiz-header">
            <div>
              <p className="section-label">Mini-lek</p>
              <h2>Hvilken bokstav hører til {target.word}?</h2>
            </div>
            <div className="score-pill">Riktige svar: {correctCount}</div>
          </div>

          <div className="quiz-word">
            <span className="quiz-emoji">{target.emoji}</span>
            <span>{target.word}</span>
          </div>

          <div className="quiz-options">
            {options.map((letter) => (
              <button
                key={`${round}-${letter.upper}`}
                className="quiz-option"
                onClick={() => handleGuess(letter)}
              >
                {letter.upper}
              </button>
            ))}
          </div>

          <p className="feedback">{feedback}</p>

          <button className="reset-button" onClick={resetGame}>
            Start på nytt
          </button>
        </article>
      </section>

      <section className="card-soft alphabet-panel">
        <div className="alphabet-header">
          <div>
            <p className="section-label">Hele alfabetet</p>
            <h2>Trykk på en bokstav</h2>
          </div>
          <p className="alphabet-note">Ja — også Æ, Ø og Å 💛</p>
        </div>

        <div className="alphabet-grid">
          {letters.map((letter) => {
            const isActive = letter.upper === selected.upper
            return (
              <button
                key={letter.upper}
                className={`letter-card${isActive ? ' active' : ''}`}
                onClick={() => setSelected(letter)}
              >
                <span className="letter-card-upper">{letter.upper}</span>
                <span className="letter-card-lower">{letter.lower}</span>
                <span className="letter-card-word">
                  {letter.emoji} {letter.word}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
