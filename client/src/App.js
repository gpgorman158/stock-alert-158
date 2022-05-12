import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from './Header'
import Signup from './Signup'
import Profile from './Profile'
import Signin from './Signin'
import Home from './Home'
import Explore from './Explore'
import Footer from './Footer'
import WebSocketStock from './WebSocketStock'
import Email from './Email'

function App() {
  const [user, setUser] = useState(null);
  const [stock, setStock] = useState(null)
  const [favorites, setFavorites] = useState ([])
  const { ticker } = useParams();
  const history = useHistory()
  
  function onLogout(){
    setUser(null);
    setFavorites([])
    history.push("/")
  }
  function onSignup(userJson){
    setUser(userJson)
    // history.push(`/`)
    // window.location.reload()
  }

  function onSearch(search){
    fetch(`https://api.polygon.io/v3/reference/tickers/${search}?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP`).then((r) => {
      if (r.ok) {
        r.json().then((stockJson) => {
          setStock(stockJson)
          history.push(`/explore/${search}`)
        });
      }
      else{
        alert("Please enter a valid stock ticker symbol")
      }
    });
  }
  function onDeleteFavorite(favoriteDelete){
    setFavorites(favorites.filter(favorite => favorite.id !== favoriteDelete.id))
  }
  
  useEffect(() => {
    fetch("/auto_login").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setFavorites(user.stocks)
          
        });
      }
    });
  }, []);

  function onAddStock(){
  
      fetch(`/auto_login`).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setUser(user)
              setFavorites(user.stocks)
            });
          }
        });
  
  }
  
  function onSubscribe(){
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify({subscription: true}),
      }).then(resp => resp.json())
      .then(userJson => {
        setUser(userJson)
        alert("You will now receive email updates")
      })
  }
  

  return (
    
      <div className="App">
        <Header user={user} onLogout={onLogout} onSearch={onSearch}/>
        <WebSocketStock ticker={ticker}/>
        <Switch>
          <Route exact path="/">
            <Home favorites={favorites}/>
          </Route>
          <Route path="/signup">
            <Signup onSignup={onSignup}/>
          </Route>
          <Route path="/profile">
            <Profile user={user} favorites={favorites} onDeleteFavorite={onDeleteFavorite}/>
          </Route>
          <Route path="/signin">
            <Signin user={user} setUser={setUser}/>
          </Route>
          <Route path="/explore/:ticker">
            <Explore stock={stock} user={user} onAddStock={onAddStock}/>
          </Route>
          <Route exact path="/secret-email">
            <Email />
          </Route>
        </Switch>
        <Footer onSubscribe={onSubscribe}/>
      </div>
    
  );
}

export default App;
