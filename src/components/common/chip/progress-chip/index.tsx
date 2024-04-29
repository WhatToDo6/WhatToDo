import Image from 'next/image'

import CIRCLE_ICON from '@/public/icons/circle-purple.svg'

import S from './ProgressChip.module.scss'

interface ProgressChipProps {
  progress: string
}

const ProgressChip = ({ progress }: ProgressChipProps) => {
  return (
    <div className={S.container}>
      <Image src={CIRCLE_ICON} width={6} height={6} alt="상태" />
      <span className={S.text}>{progress}</span>
    </div>
  )
}

export default ProgressChip
