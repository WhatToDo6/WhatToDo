import Image from 'next/image'
import S from './ProgressChip.module.scss'

import CIRCLE_ICON from '@/public/icons/circle-purple.svg'

interface ProgressChipProps {
  progress: 0 | 1 | 2
}

enum ProgressListEnum {
  'To Do' = 0,
  'On Progress' = 1,
  'Done' = 2,
}

/**
 *
 * @param {progress} number - 0 : to do, 1: on progress, 2: done
 * @returns
 */
const ProgressChip = ({ progress }: ProgressChipProps) => {
  return (
    <div className={S.container}>
      <Image src={CIRCLE_ICON} width={6} height={6} alt="상태" />
      <span className={S.text}>{ProgressListEnum[progress]}</span>
    </div>
  )
}

export default ProgressChip
