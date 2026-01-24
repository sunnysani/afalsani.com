import LightRays from "@/components/common/library/LightRays";
import styles from "./IndexPage.module.css";
// import TopBar from "@/components/common/topbar/TobBar";

const IndexPage = () => {
  return (
    <>
      {/* <TopBar /> */}
      <div className={styles.main}>
        <LightRays
          raysOrigin="top-center"
          raysColor="white"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        <div className={styles.container}>
          <h1>Naufal Sani's web is not ready yet</h1>
          {/* Remove <a /> style with tailwind */}
          <h2>
            <a
              href="https://docs.google.com/document/d/1tW2kJW_GezHZL91W_yAN4NQ18g3gypLBMecokJhqrlA/edit?usp=sharing"
              className="no-underline text-inherit transition-colors duration-200 hover:text-blue-600 hover:underline text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to resume
            </a>
          </h2>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
