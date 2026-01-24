import styles from "./TobBar.module.css";

const TopBar = () => {
  return (
    <div className={styles.main}>
      <h3>Naufal Sani</h3>
      <div>
        <button>Work</button>
        <button>Projects</button>
      </div>
    </div>
  );
};

export default TopBar;
