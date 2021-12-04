import styles from './style.module.scss'

export default () => {
  return (
    <div className="page-loading" style={styles}>
      <img src="/dot-loader-black.svg" />
    </div>
  )
}
