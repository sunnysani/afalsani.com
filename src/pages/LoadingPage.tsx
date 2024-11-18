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
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width={150} height={150}><circle fill='#7E99D8' stroke='#7E99D8' stroke-width='15' r='15' cx='40' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate></circle><circle fill='#7E99D8' stroke='#7E99D8' stroke-width='15' r='15' cx='100' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate></circle><circle fill='#7E99D8' stroke='#7E99D8' stroke-width='15' r='15' cx='160' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate></circle></svg>
      </div>
      <h2>Loading Page</h2>
    </div>
  );
};

export default LoadingPage;
