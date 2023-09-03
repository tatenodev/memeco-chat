import { useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

export const WatchPartyRequest = () => {
  const isOpen = useSignal(false);

  return (
    <>
      <Button onClick={() => isOpen.value = !isOpen.value}>ウォチパリク</Button>
      {isOpen.value && <div>hoge</div>}
    </>
  );
};
