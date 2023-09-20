import { FC } from "react";

type CaptchaType = {
  captcha: string;
};

export const Captcha: FC<CaptchaType> = ({ captcha }) => {
  return (
    <div>
      <h3>Captcha</h3>
      <div>
        <img src={captcha} alt="captcha" />
      </div>

      <input type="text" placeholder="" />
    </div>
  );
};
