import { Message } from "./type.ts";

const kv = await Deno.openKv();
const MESSAGE_LOG = "message_log";

export const getMessage = async () => {
  const logs = kv.list<Message>({ prefix: [MESSAGE_LOG] });
  const message: Message[] = [];
  for await (const entry of logs) {
    message.push(entry.value);
  }
  return message;
};

export const addMessage = async (message: Message) => {
  const result = await kv.set([MESSAGE_LOG, message.id], message);
  return result;
};

export const removeAllMessage = async () => {
  const logs = kv.list({ prefix: [MESSAGE_LOG] });
  for await (const entry of logs) {
    kv.delete(entry.key);
  }
  return "all delete.";
};
