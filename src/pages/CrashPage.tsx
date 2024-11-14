interface CrashPageProps {
  error?: Error;
}

const CrashPage = (props: CrashPageProps) => {
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
          src="/public/icons/error-icon.svg"
          width={150}
          height={150}
          alt="error"
        />
      </div>
      <h2>Something went wrong</h2>
      {props.error && (
        <p
          style={{
            maxWidth: 400,
            margin: "0 16px",
            padding: "8px 16px",
            background: "#D9D9D9",
            borderRadius: 4,
            color: "black",
            fontFamily: "Helvetica Oblique",
          }}
        >
          Error Message: {props.error.message}
        </p>
      )}
    </div>
  );
};

export default CrashPage;
