// Show a full-screen blurred image background

const Background = () => {
  return (
    <img
      src="https://persistent.oaistatic.com/burrito-nux/1920.webp"
      alt="background"
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        opacity: 0.4,
        filter: "blur(32px) brightness(0.9)",
        transform: "scale(1.05)",
        transition: "opacity 0.3s",
      }}
      className="dark:opacity-30"
    />
  );
};

export default Background;
