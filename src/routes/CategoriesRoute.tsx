import * as React from 'react'
import { connect } from 'react-redux';
import { requestTopCategoriesThunk } from '../actions/GlobalActions';
import { StoreState, LatLon, CategorySummary } from '../types/index';
import { Dispatch } from 'redux';
import { CATEGORY_TYPE, RANK_TYPE } from '../constants/index';
import * as _ from 'lodash';
import CategorySummarySection from '../components/CategorySummarySection';
import { Link } from 'react-router-dom';

export interface CategoriesRouteProps {
    latLon: LatLon;
    rankType: RANK_TYPE;
    categoryType: CATEGORY_TYPE;

    categoriesTop: CategorySummary[]

    dispatch: Dispatch<StoreState>;
}

class CategoriesRoute extends React.Component<CategoriesRouteProps> {
    public componentDidMount() {
        this.props.dispatch(requestTopCategoriesThunk(this.props.latLon, this.props.categoryType));
    }

    render() {
        return (
            <div>
                <Link to={`/bouts`}>
                    Judge Some Bouts <span className="fa fa-arrow-right" />
                </Link>
                {
                    _.map(this.props.categoriesTop, topCat => {
                        return (
                            <CategorySummarySection categorySummary={topCat} rankType={this.props.rankType} />
                        )
                    })
                }
            </div>

        )
    }
}
export function mapStateToProps(state: StoreState) {
    return {
        latLon: state.latLon,
        rankType: state.rankType,

        categoryType: state.categoryType,
        categoriesTop: state.categoriesTop,
    }
}


export default connect(mapStateToProps)(CategoriesRoute);