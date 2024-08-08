"use client"

import { APP_ROUTES } from "@/_lib/constants"
import { Share } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { Button, Link } from "@nextui-org/react"
import { ExternalLink } from "lucide-react"
import { Key, useState } from "react"
import { ShareColumnKey } from "../_mock/shareColumn.mock"

type Props = {
  share: Share
  columnKey: Key
  onDeleteCell: (id: string) => void
}

const RenderCellShare = ({ share, columnKey, onDeleteCell }: Props) => {
  const cellValue = share[columnKey as keyof Share]
  const [showPopover, setShowPopover] = useState(false)

  switch (columnKey as ShareColumnKey) {
    case "_id":
      return <p>{share._id}</p>
    case "createdAt":
      return <dd>{formatDate(share.createdAt!, "LLLL")}</dd>
    case "expiredAt":
      return <dd>{formatDate(share.expiredAt!, "LLLL")}</dd>
    case "isShared":
      return <p>{share.isShared ? "Đã chia sẻ" : "Chưa chia sẻ"}</p>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            rel='noopener noreferrer'
            target='_blank'
            href={APP_ROUTES.SHARE.ID(share._id!)}
          >
            <ExternalLink size={20} />
          </Button>
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}
export default RenderCellShare
