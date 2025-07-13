import styles from "./Button.module.css";

//type string to conditionaly add CSS class (= className)
//children prop so that we can pass in some content
//type will be sent as parameter in the component that call this Button comp.
// (Form.jsx).
// To pass 2 class names in CSS module we need to create a template literal `${}
function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
