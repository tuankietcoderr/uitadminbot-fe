"use client"
import { Tab, Tabs } from "@nextui-org/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const tabs = [
  {
    title: "Liên kết",
    _key: "link"
  },
  {
    title: "Tài liệu PDF",
    _key: "pdf"
  },
  {
    title: "Tài liệu Excel",
    _key: "excel"
  }
  // {
  //   title: "Hình ảnh",
  //   _key: "image"
  // },
] as {
  title: string
  _key: string
}[]

const DataTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]._key)

  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("selected_tab")

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab)
    }
  }, [selectedTab])

  return (
    <Tabs
      variant='underlined'
      aria-label='Tabs variants'
      size='lg'
      onSelectionChange={(v) => setActiveTab(v.toString())}
      selectedKey={activeTab}
      className='mb-4'
    >
      {tabs.map((tab) => (
        <Tab key={tab._key} title={tab.title} as={Link} href={`?selected_tab=${tab._key}`} />
      ))}
    </Tabs>
  )
}

export default DataTabs
