type ProfileStatus = {
  status: string;
};

export const ProfileStatus = (props: ProfileStatus) => {
  return (
    <div>
      <div>
        <span>{props.status}</span>
      </div>
      <div>
        <input />
        {props.status}
      </div>
    </div>
  );
};
