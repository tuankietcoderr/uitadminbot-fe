import Image from "next/image"

const Page = () => {
  return (
    <>
      <h1 className='text-center text-2xl font-semibold'>Bạn không có quyền truy cập trang này</h1>
      <Image src={"/403.svg"} alt='403' width={400} height={400} priority />
    </>
  )
}

export default Page
