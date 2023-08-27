import { Signal, useSignal } from "@preact/signals";
import { tw } from "twind";
import { css } from "twind/css";
import { Button } from "../components/Button.tsx";
import { isValidColorCode } from "../utils/color.ts";

const Container = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.8);
`;

const BoxWrapper = css`
  width: 100%;
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
`;

const Box = css`
  width: 100%;
  height: 100%;
  padding: 16px;
  background: #313338;
  border-radius: 10px;
`;

const ButtonWrapper = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

type SettingModalProps = {
  isOpen: Signal<boolean>;
  userName: Signal<string>;
  userColor: Signal<string>;
};

export function SettingModal(
  { isOpen, userName, userColor }: SettingModalProps,
) {
  const localName = useSignal(userName.value);
  const localColor = useSignal(userColor.value);

  const handleClose = () => {
    isOpen.value = false;
  };

  const saveSettings = () => {
    if (!isValidColorCode(localColor.value)) {
      alert("有効なカラーコードではありません");
      return;
    }

    userName.value = localName.value;
    userColor.value = localColor.value;
    window.localStorage.setItem(
      "memecoPrisonSettings",
      JSON.stringify({
        userName: localName.value,
        userColor: localColor.value,
      }),
    );
    isOpen.value = false;
  };

  return (
    <div class={tw(Container)} onClick={handleClose}>
      <div class={tw(BoxWrapper)} onClick={(e) => e.stopPropagation()}>
        <div class={tw(Box)}>
          <p class="text-white pb-3">ユーザー設定</p>
          <div>
            <label class="text-white pr-2" htmlFor="setting_user_name">
              表示名
            </label>
            <input
              class="px-1 rounded"
              autocomplete="off"
              id="setting_user_name"
              type="text"
              value={localName.value}
              onChange={(e) => localName.value = e.currentTarget.value}
            />
          </div>
          <div class="pt-3">
            <label class="text-white pr-2" htmlFor="setting_user_color">
              カラーコード
            </label>
            <input
              class="px-1 rounded"
              autocomplete="off"
              id="setting_user_color"
              type="text"
              value={localColor.value}
              onChange={(e) => localColor.value = e.currentTarget.value}
            />
          </div>
          <div class={tw(ButtonWrapper)}>
            <Button onClick={saveSettings}>
              設定
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
