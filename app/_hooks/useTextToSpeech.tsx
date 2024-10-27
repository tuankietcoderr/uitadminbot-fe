import { useEffect, useRef, useState } from "react"

type Props = {
  text: string
  lang?: string
}

const useTextToSpeech = ({ text, lang = "vi-VN" }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance>(null)
  useEffect(() => {
    window.onbeforeunload = () => {
      window.speechSynthesis.cancel()
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  const startSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.")
      return
    }

    //@ts-ignore
    utteranceRef.current = new SpeechSynthesisUtterance(text)
    utteranceRef.current.pitch = 1
    utteranceRef.current.rate = 1
    utteranceRef.current.volume = 1
    utteranceRef.current.lang = lang

    // Event listeners for managing speech state
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true)
    }
    utteranceRef.current.onend = () => {
      setIsSpeaking(false)
    }
    utteranceRef.current.onerror = () => {
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utteranceRef.current)
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return {
    startSpeech,
    stopSpeech,
    isSpeaking
  }
}

export default useTextToSpeech
