export function Avatar({ imageUrl, name, size = 32 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      {!imageUrl && name && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "0.75px solid #101828",
            backgroundColor: "#F2F4F7",
            color: "#475467",
            fontWeight: 600,
            fontSize: size / 2,
          }}
        >
          {name[0]}
        </div>
      )}
    </div>
  );
}
