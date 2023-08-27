export function XLink() {
  return (
    <a
      class="flex bg-black text-white rounded"
      style={{
        width: 197,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      }}
      href="https://twitter.com/memeco2525"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        width="20"
        height="20"
        style={{ padding: "8px 0 6px" }}
        src="/X-logo.svg"
        alt="X"
      />
      <span style={{ paddingLeft: "10px" }}>@memeco2525</span>
    </a>
  );
}
