const LoadingPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src="/public/icons/bouncing-circles.svg"
          width={150}
          height={150}
          alt="loading"
        />
      </div>
      <h2>Loading Page</h2>
    </div>
  );
};

export default LoadingPage;
