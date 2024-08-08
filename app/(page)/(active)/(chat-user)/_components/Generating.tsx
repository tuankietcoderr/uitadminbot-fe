import Image from "next/image"
import { TypeAnimation } from "react-type-animation"

const Generating = () => {
  return (
    <div className='flex items-center gap-4 px-5'>
      <div className='size-10 rounded-full border bg-white p-1 dark:border-gray-700'>
        <Image src={"/logo.png"} width={40} height={40} alt='' className='object-contain' />
      </div>
      <p className='text-left text-sm font-semibold text-gray-500'>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed once, initially
            "Chatbot đang trả lời câu hỏi của bạn.",
            500,
            "Chatbot đang trả lời câu hỏi của bạn..",
            500,
            "Chatbot đang trả lời câu hỏi của bạn...",
            500
          ]}
          speed={99}
          style={{
            fontSize: "1rem"
          }}
          repeat={Infinity}
        />
      </p>
    </div>
  )
}

export default Generating
