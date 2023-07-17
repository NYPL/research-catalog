import type { ReactElement } from "react"
import styles from "@/styles/components/ImageCard.module.scss"

interface ImageCardProps {
  imageSrc: string
  children: ReactElement
}

const ImageCard = ({ imageSrc, children }: ImageCardProps) => {
  return (
    <article className={styles.imageCardContainer}>
      <div className={styles.imageCardImage}>
        <img src={imageSrc} alt="" role="presentation" />
      </div>
      <div className={styles.imageCardBody}>{children}</div>
    </article>
  )
}

export default ImageCard
