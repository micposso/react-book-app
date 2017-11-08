import React, { Component } from 'react';
import MdBook from 'react-icons/lib/md/book';


class App extends Component {
    render() {
        return ( <
            div className = "App" >
            <
            div className = "App-header" >
            <
            MdBook className = "App-logo" / >
            <
            h2 > My Books App < /h2> <
            /div> <
            p className = "App-intro" >
            To get started, edit < code > src / App.js < /code> and save to reload. <
            /p> <
            /div>
        );
    }
}

export default App;