import { Message } from "./type.ts";

const kv = await Deno.openKv();
const MESSAGE_LOG = "message_log";

export const getMessage = async () => {
  try {
    const logs = kv.list<Message>({ prefix: [MESSAGE_LOG] });
    const message: Message[] = [];
    for await (const entry of logs) {
      message.push(entry.value);
    }
    return message;
  } catch (err) {
    console.log("getMessage err:", err);
    throw new Error("getMessageErr");
  }
};

export const addMessage = async (message: Message) => {
  const result = await kv.set([MESSAGE_LOG, message.id], message, {
    // expireIn: 30 * 24 * 60 * 60, // 30日後に削除
    expireIn: 10 * 1000, // 10秒後に削除
  });
  return result;
};

export const removeAllMessage = async () => {
  const logs = kv.list({ prefix: [MESSAGE_LOG] });
  for await (const entry of logs) {
    kv.delete(entry.key);
  }
  return "all delete.";
};
