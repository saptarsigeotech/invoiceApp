import styles from "./Button.module.css"
import { ButtonType } from "@/types/types"

const Button = ({children, onClick, variant} : ButtonType) => {

  const classes = `${styles.button} ${styles[`button-${variant}`]}`
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
