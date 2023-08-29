import React, { ChangeEvent } from "react";

type ProfileStatusType = {
  status: string;
  updateStatusTC: (status: string) => Function;
};

type StateType = {
  editMode: boolean;
  status: string;
};
export class ProfileStatus extends React.Component<ProfileStatusType> {
  state: StateType = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatusTC(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      status: e.currentTarget.value,
    });
  };
  componentDidUpdate(prevProps: ProfileStatusType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              autoFocus
              // value={this.props.status}
              onBlur={this.deactivateEditMode}
              onChange={(e) => this.onStatusChange(e)}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.state.status || "------"}
            </span>
          </div>
        )}
      </div>
    );
  }
}

// export const ProfileStatus = (props: ProfileStatus) => {
//   return (
//     <div>
//       <div>
//         <span>{props.status}</span>
//       </div>
//       <div>
//         <input value={props.status} />
//       </div>
//     </div>
//   );
// };
