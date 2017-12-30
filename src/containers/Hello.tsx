import Hello from '../components/Hello';
import { ContestantsResponseAction, fetchChallengers } from '../actions/kingsApiActions';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { Props } from '../components/Hello'

export function mapStateToProps(state: StoreState, ownProps: Props) {
    return {
        ...ownProps,
        contestants: state.contestants,
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<ContestantsResponseAction>,
    ownProps: Props,
) {
    return {
        ...ownProps,
        fetchChallengers: (lat: number, lon: number, challengerContestantId: number) =>
            dispatch(fetchChallengers(
                ownProps.lat,
                ownProps.lon,
                ownProps.challengerContestantId
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);