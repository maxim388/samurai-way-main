import React, { useState, useEffect, ChangeEvent } from "react";

type ProfileStatusType = {
  status: string;
  updateStatusTC: (status: string) => Function;
};

export const ProfileStatusWithHooks: React.FC<ProfileStatusType> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  useEffect(() => {
    setStatus(props.status);
    return () => {};
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatusTC(status);
  };
  return (
    <div>
      {editMode ? (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            value={status}
            onChange={(e) => onStatusChange(e)}
          />
        </div>
      ) : (
        <div>
          <span onDoubleClick={activateEditMode}>{status || "------"}</span>
        </div>
      )}
    </div>
  );
};
