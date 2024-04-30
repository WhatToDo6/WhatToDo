import S from './LoadingIndicator.module.scss'

const LoadingIndicator = () => {
  return (
    <div className={S.holder}>
      <div className={S.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default LoadingIndicator
