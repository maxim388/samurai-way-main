type CaptchaType = {
  captcha: string;
};

export const Captcha: React.FC<CaptchaType> = ({ captcha }) => {
  return (
    <div>
        <h3>Captcha</h3>
      <div>
        <img src={captcha} alt="captcha" />
      </div>

      <input type="text" placeholder=""/>
    </div>
  );
};
