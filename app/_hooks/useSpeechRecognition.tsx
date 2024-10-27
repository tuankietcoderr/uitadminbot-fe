//@ts-nocheck
import { useEffect, useRef, useState } from "react"

const useSpeechRecognition = ({
  lang = "vi-VN",
  interimResults = false,
  continuous = false,
  silenceTimeout = 5000
}) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null) // Timer for silence detection

  useEffect(() => {
    // Check if SpeechRecognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.")
      return
    }

    // Initialize the SpeechRecognition instance
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = lang
    recognitionRef.current.interimResults = interimResults
    recognitionRef.current.continuous = continuous

    // Handle recognition results
    recognitionRef.current.onresult = (event) => {
      const speechToText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
      setTranscript(speechToText)

      // Reset silence timer on new speech input
      resetSilenceTimer()
    }

    // Handle recognition errors
    recognitionRef.current.onerror = (event) => setError(event.error)

    // Handle the end of speech recognition
    recognitionRef.current.onend = () => {
      clearTimeout(silenceTimerRef.current)
      setIsListening(false)
    }

    return () => {
      recognitionRef.current && recognitionRef.current.abort()
      clearTimeout(silenceTimerRef.current)
    }
  }, [lang, interimResults, continuous])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      setTranscript("") // Clear previous transcript
      setError(null) // Clear previous errors
      recognitionRef.current.start()
      startSilenceTimer() // Start silence timer
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      clearTimeout(silenceTimerRef.current)
    }
  }

  // Timer management
  const startSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current)
    silenceTimerRef.current = setTimeout(() => {
      stopListening()
    }, silenceTimeout)
  }

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current)
    startSilenceTimer()
  }

  return { isListening, transcript, error, startListening, stopListening }
}

export default useSpeechRecognition
