import Image from "next/image"

const Page = () => {
  return (
    <>
      <h1 className='text-center text-2xl font-semibold'>
        Tài nguyên mà bạn đang truy cập tạm thời không khả dụng. Vui lòng thử lại sau.
      </h1>
      <Image src={"/400.svg"} alt='401' width={400} height={400} priority />
    </>
  )
}

export default Page
