import * as React from 'react'
import BoutRoute from './routes/BoutRoute'

export interface AppProps {
}

export default class App extends React.Component<AppProps> {
    render() {
        return (
            <BoutRoute />
        )
    }
}
