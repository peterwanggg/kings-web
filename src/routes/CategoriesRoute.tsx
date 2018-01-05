import * as React from 'react'
import { connect } from 'react-redux';

export interface CategoriesRouteProps {
}

class CategoriesRoute extends React.Component<CategoriesRouteProps> {

    render() {
        return <div>hihihi</div>
    }
}

export default connect()(CategoriesRoute);