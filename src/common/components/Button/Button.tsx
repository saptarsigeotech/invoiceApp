import styles from "./Button.module.css"
import { ButtonType } from "@/types/types"

const Button = ({children, onClick, variant, disabled, others, type="button"} : ButtonType) => {

  const classes = `${styles.button} ${styles[`button-${variant}`]}`
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...others}>
      {children}
    </button>
  )
}

export default Button
