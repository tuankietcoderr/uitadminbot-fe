"use client"
import { LanguageSwitcher, ThemeSwitcher } from "@/_components"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { CogIcon, Construction, DatabaseZap } from "lucide-react"
import { useTheme } from "next-themes"
import DataSettings from "./DataSettings"
import MaintainSetting from "./MaintainSetting"
import SettingItem from "./SettingItem"

type Props = {
  isSuperAdmin: boolean
}

const Settings = ({ isSuperAdmin }: Props) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  return (
    <div className='mt-4'>
      <Accordion variant='light' selectionMode='multiple' defaultExpandedKeys={["general", "maintain", "data"]}>
        <AccordionItem
          title={<SettingItem title='Cài đặt chung' description='Cài đặt chung của hệ thống' icon={CogIcon} />}
          key={"general"}
        >
          <div className='flex items-center py-4'>
            <p className='flex-1'>Giao diện: {isDark ? "Tối" : "Sáng"}</p>
            <ThemeSwitcher />
          </div>
          <div className='flex items-center py-4'>
            <p className='flex-1'>Ngôn ngữ</p>
            <LanguageSwitcher />
          </div>
        </AccordionItem>
        <AccordionItem
          title={<SettingItem title='Cài đặt bảo trì' description='Cài đặt bảo trì hệ thống' icon={Construction} />}
          key={"maintain"}
          className={isSuperAdmin ? "" : "hidden"}
        >
          <MaintainSetting />
        </AccordionItem>
        <AccordionItem
          title={<SettingItem title='Cài đặt dữ liệu' description='Cài đặt dữ liệu của hệ thống' icon={DatabaseZap} />}
          key={"data"}
        >
          <DataSettings />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Settings
