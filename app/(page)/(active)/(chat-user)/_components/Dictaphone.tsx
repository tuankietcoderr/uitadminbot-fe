"use client"
import useSpeechRecognition from "@/_hooks/useSpeechRecognition"
import { Button } from "@nextui-org/react"
import { Mic, MicOff } from "lucide-react"
import { useEffect } from "react"
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

type Props = {
  onSpeech: (result: string) => void
  onListeningChange: (isListening: boolean) => void
}

const Dictaphone = ({ onSpeech, onListeningChange }: Props) => {
  const { transcript, error, isListening, startListening, stopListening } = useSpeechRecognition({
    continuous: true,
    lang: "vi-VN",
    interimResults: true
  })
  useEffect(() => {
    if (transcript.length > 0) {
      onSpeech(transcript)
    }
  }, [transcript])

  useEffect(() => {
    onListeningChange(isListening)
  }, [isListening])

  const handler = () => {
    if (isListening) {
      stopListening()
    } else {
      onSpeech("")
      startListening()
    }
  }

  if (error) return null

  return (
    <Button isIconOnly variant='light' radius='full' onClick={handler}>
      {isListening ? <MicOff /> : <Mic />}
    </Button>
  )
}
export default Dictaphone
