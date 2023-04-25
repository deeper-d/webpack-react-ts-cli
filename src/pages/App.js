import { divide } from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.scss'

import icon from '../../src/assets/icon.jpeg'

// const App = function() {
//     return <h1>Hello from React!</h1>;
// }

// export default App
class App extends Component {

    render() {
        return (
            <>
                <div className={styles.app}>
                    this is a new div 555
                </div>
                <img src={icon}></img>
            </>
        )
    }

}

export default App