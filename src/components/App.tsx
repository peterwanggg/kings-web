// import * as React from 'react'
// import BoutContainer from './BoutContainer'
// import { StoreState, INITIAL_STATE, LatLon } from '../types/index'
// import { connect, Dispatch } from 'react-redux';
// import { BoutProps } from '../components/Bout'
// import { KINGS_API_ACTION } from '../constants/index';
// import { requestContestantsCall, RequestContestantsCallType } from '../actions/kingsApiActions';

// export interface AppProps {
//     latLon: LatLon;
//     categoryId: number;
//     requestContestantsCall: RequestContestantsCallType;
// }
// // export interface AppPropsState {
// //     latLon: LatLon;
// //     categoryId: number;
// // }

// const App = ({ latLon, categoryId, requestContestantsCall }: AppProps) => {

//     // constructor(props: AppProps) {
//     //     super(props)
//     // }

//     // componentDidMount() {
//     //     this.props.requestContestantsCall(
//     //         this.props.latLon,
//     //         this.props.categoryId
//     //     )
//     // }


//     return (
//         <div>
//             <BoutContainer
//                 latLon={INITIAL_STATE.latLon}
//                 challenger={INITIAL_STATE.challenger}
//                 currContestantIndex={INITIAL_STATE.currContestantIndex}
//                 contestants={INITIAL_STATE.contestants}
//             // requestChallengersCall={requestChallengersCall}
//             // submitBoutCall={submitBoutCall}
//             />
//         </div>
//     )

// }

// export default App;