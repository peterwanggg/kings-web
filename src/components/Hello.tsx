import * as React from 'react';
import './Hello.css';
import { ContestantsResponseAction } from '../actions/kingsApiActions';
import { Dispatch } from 'redux'
import { StoreState } from "../types/index"


export interface Props {
  lat: number;
  lon: number;
  challengerContestantId: number;

  contestants?: JSON,
  fetchChallengers: (lat: number, lon: number, challengerContestantId: number) =>
    (dispatch: Dispatch<StoreState>) =>
    Promise<ContestantsResponseAction>;
}


function Hello({ contestants, fetchChallengers }: Props) {

  return (
    <div className="hello">
      <div className="greeting">
        Hello {contestants}
      </div>
      <div>
        <button onClick={() => fetchChallengers(
          47.6522155000,
          -122.3543657000,
          4)}>-</button>
      </div>
    </div>
  );
}

// class Hello extends React.Component<Props, object> {
//   render() {
//     // const { name, enthusiasmLevel = 1 } = this.props;

//     // if (enthusiasmLevel <= 0) {
//     //   throw new Error('You could be a little more enthusiastic. :D');
//     // }

//     return (
//       <div className="hello">
//         <div className="greeting">
//           Hello {name + getExclamationMarks(2)}
//         </div>
//       </div>
//     );
//   }
// }


export default Hello;

