import { useSignal } from "@preact/signals";

export function Chat() {
  const inputMessage = useSignal("");

  return (
    <div>
      <input
        type="text"
        placeholder="メッセージを送信"
        value={inputMessage.value}
        onChange={(e) => inputMessage.value = e.currentTarget.value}
      />
    </div>
  );
}
