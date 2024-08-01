import Title from "../_components/Title"
import AssetListData from "./_components/AssetListData"
import DataTabs from "./_components/DataTabs"

const page = () => {
  return (
    <div>
      <Title>Quản lý dữ liệu</Title>
      <div className='mt-4'>
        <DataTabs />
        <AssetListData />
      </div>
    </div>
  )
}

export default page
