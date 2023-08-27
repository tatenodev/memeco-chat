export function TwitchLink() {
  return (
    <a
      class="flex bg-[#A970FF] text-white rounded"
      style={{
        width: 197,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      }}
      href="https://www.twitch.tv/memeco00"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        width="20"
        height="20"
        style={{ padding: "8px 0 6px" }}
        src="/TwitchGlitchWhite.svg"
        alt="Twtich"
      />
      <span style={{ paddingLeft: "10px" }}>Twtich</span>
    </a>
  );
}
