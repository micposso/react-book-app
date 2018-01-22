import React from 'react'
import ReactDOM from 'react-dom'
import BooksApp from './App'
import { BrowserRouter as Router} from 'react-router-dom'
import './css/index.css'

ReactDOM.render( <Router>< BooksApp / ></Router> , document.getElementById('root'))