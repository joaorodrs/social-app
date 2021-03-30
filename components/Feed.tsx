import styles from '../styles/components/Feed.module.css'

const Feed = () => {
  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedItem}>
        <img src="https://github.com/joaorodrs.png" className={styles.profileImage} />
        <h2>João Paulo</h2>
        <div className="content">
          <p>Isso é um post bem legal que eu estou fazendo... hehe</p>
          <img className={styles.contentImage} src="https://github.com/joaorodrs.png" />
        </div>
      </div>
    </div>
  )
}

export default Feed
