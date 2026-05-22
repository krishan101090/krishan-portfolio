import Image from 'next/image'
import styles from './ProfileAvatar.module.css'

export default function ProfileAvatar({ person, size = 'md', active = false, priority = false }) {
  const src = person?.photo
  if (!src) return null

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${active ? styles.active : ''}`}
      aria-hidden="true"
    >
      <span className={styles.ring} />
      <span className={styles.ring2} />
      <div className={styles.photoWrap}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={size === 'sm' ? '40px' : '72px'}
          className={styles.photo}
        />
      </div>
    </div>
  )
}
