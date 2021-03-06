import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsmobile from './aws-exports';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Select from 'react-select';
import UUID from 'uuidjs';
import Particles from 'react-particles-js';
import { I18n } from 'aws-amplify';
import { vocabularies } from './components/volabrary';

import Home from './components/Home'
import Services from './components/Services';
import Request from './components//Request';
import * as options from './components//Options';
import Analysis from './components//Analysis';
import AllRequest from './components/AllRequest';
import Find from './components/Find';
import AgentRequest from './components/AgentRequest';
import Profile from './components/Profile';
import Message from './components/Message'
import { createTourist, createAgent, updateAgent } from './graphql/mutations'
import { listTouristBySpecificOwner, listAgentBySpecificOwner } from './graphql/queries';
Amplify.configure(awsmobile);
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState(undefined);
  const [type, SetType] = useState(null);
  const [isAgentRegisterd, SetIsAgentRegisterd] = useState(false);
  const [agentArea, SetAgentArea] = useState(null);
  const [touristCount, touristCounter] = useState(0);
  const [agentCount, agentCounter] = useState(0);
  const [area, SetArea] = useState('');
  const [business, SetBusiness] = useState('');
  const [agentID, SetAgentID] = useState(UUID.generate());

  // Handlers
  const handleArea = event => {
    SetArea(event.value);
  }
  const handleBusiness = event => {
    SetBusiness(event.value);
  }

  // UserType
  const getTouristType = async () => {
    if (user) {
      const res = await API.graphql(
        graphqlOperation(listTouristBySpecificOwner, {
          owner: user.username
        }
        )
      );
      var info = res.data.listTouristBySpecificOwner;
      if (info != null && info.items.length > 0) { SetType("tourist"); }
    }
  }
  const getAgentType = async () => {
    if (user) {
      const res = await API.graphql(
        graphqlOperation(listAgentBySpecificOwner, {
          owner: user.username
        }
        )
      );
      var info = res.data.listAgentBySpecificOwner;
      if (info != null && info.items.length > 0) {
        SetType("agent");
        SetAgentID(info.items[0].id);
        if (info.items[0].area !== null && info.items[0].business !== null) {
          SetIsAgentRegisterd(true);
          SetAgentArea(info.items[0].area);
          SetBusiness(info.items[0].business);
        }
      }
    }
  }

  // Tourist Register
  const registerTourist = async () => {
    await API.graphql(
      graphqlOperation(createTourist, {
        input: {
          type: "tourist",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    SetType("tourist");
  }
  // Agent Register
  const registerAgent = async () => {
    await API.graphql(
      graphqlOperation(createAgent, {
        input: {
          id: agentID,
          type: "agent",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    SetType("agent");
  }
  // Agent Information
  const updateAgentInfo = async () => {
    await API.graphql(
      graphqlOperation(updateAgent, {
        input: {
          type: "agent",
          id: agentID,
          area: area,
          business: business,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    SetIsAgentRegisterd(true);
  }

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
    getTouristType();
    getAgentType();
  }, [user]);

  return authState === AuthState.SignedIn && user ? (
    <div>
      {type === null ? (
        <div>
          <Router>
            <div className="content-flex-wrap">
              <div className="profile">
                <Profile user={user} usertype={null} area={null} business={null} />
                <AmplifySignOut />
                <List>
                  <ListItem>
                    <ListItemText primary={
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={registerTourist}
                      >?????????</Button>
                    } />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={registerAgent}
                      >????????????</Button>
                    } />
                  </ListItem>
                </List>
              </div>
              <div className="content-flex">
                <header>
                  <nav>
                    <ul>
                      <li><Link to="/">HOME</Link></li>
                      <li><Link to="/services/">SERVICES</Link></li>
                    </ul>
                  </nav>
                </header>
                <Switch>
                  <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
                  <Route path="/services/" exact component={Services} />
                  <Route path="/:userID" exact component={AllRequest} />
                  <Redirect path="*" to="/" />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      ) : (
        <div>
          {type === "agent" ? (
            (isAgentRegisterd ? (
              <div>
                {agentArea === null ? (
                  <div>
                    <Router>
                      <div className="content-flex-wrap">
                        <div className="profile">
                          <Profile user={user} usertype={type} area={null} business={null} />
                          <AmplifySignOut />
                        </div>
                        <div className="content-flex">
                          <header>
                            <nav>
                              <ul>
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/services/">SERVICES</Link></li>
                              </ul>
                            </nav>
                          </header>
                          <Switch>
                            <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
                            <Route path="/services/" exact component={Services} />
                            <Route path="/:userID" exact component={AllRequest} />
                            <Redirect path="*" to="/" />
                          </Switch>
                        </div>
                      </div>
                    </Router>
                  </div>
                ) : (
                  <div>
                    <Router>
                      <div className="content-flex-wrap">
                        <div className="profile">
                          <Profile user={user} usertype={type} area={agentArea} business={business} />
                          <AmplifySignOut />
                        </div>
                        <div className="content-flex">
                          <header>
                            <nav>
                              <ul>
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/services/">SERVICES</Link></li>
                                <li><Link to="/find/">FIND</Link></li>
                                <li><Link to="/analysis/">ANALYSIS</Link></li>
                                <li><Link to="/requests/">GET REQUEST</Link></li>
                              </ul>
                            </nav>
                          </header>
                          <Switch>
                            <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
                            <Route path="/services/" exact component={Services} />
                            <Route path="/find/" exact render={({ match }) => <Find match={match} area={agentArea} username={user.username} />} />
                            <Route path="/requests/" exact render={({ match }) => <AgentRequest match={match} area={agentArea} username={user.username} />} />
                            <Route path="/analysis/" exact render={({ match }) => <Analysis match={match} area={agentArea} />} />
                            <Route path="/message/:roomID" exact render={({ match }) => <Message match={match} username={user.username} />} />
                            <Route path="/:userID" exact component={AllRequest} />
                            <Redirect path="*" to="/" />
                          </Switch>
                        </div>
                      </div>
                    </Router>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Router>
                  <div className="content-flex-wrap">
                    <div className="profile">
                      <Profile user={user} usertype={type} area={null} business={null} />
                      <AmplifySignOut />
                      <List>
                        <ListItem key='agent-field_area'>
                          <div>??????</div>
                          <Select
                            id="area"
                            onChange={handleArea}
                            options={options.AREA_OPTIONS}
                          />
                        </ListItem>
                        <ListItem key='pagent-field_business'>
                          <div>??????</div>
                          <Select
                            id="business"
                            onChange={handleBusiness}
                            options={options.BUSINESS_OPTIONS}
                          />
                        </ListItem>
                        <ListItem key='agent-button'>
                          <ListItemText primary={
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={updateAgentInfo}
                            >??????</Button>
                          } />
                        </ListItem>
                      </List>
                    </div>
                    <div className="content-flex">
                      <header>
                        <nav>
                          <ul>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/services/">SERVICES</Link></li>
                          </ul>
                        </nav>
                      </header>
                      <Switch>
                        <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
                        <Route path="/services/" exact component={Services} />
                        <Route path="/:userID" exact component={AllRequest} />
                        <Redirect path="*" to="/" />
                      </Switch>
                    </div>
                  </div>
                </Router>
              </div>
            ))
          ) : (
            <div>
              <Router>
                <div className="content-flex-wrap">
                  <div className="profile">
                    <Profile user={user} usertype={type} area={null} business={null} />
                    <AmplifySignOut />
                  </div>
                  <div className="content-flex">
                    <header>
                      <nav>
                        <ul>
                          <li><Link to="/">HOME</Link></li>
                          <li><Link to="/services/">SERVICES</Link></li>
                          <li><Link to="/request/">REQUEST</Link></li>
                        </ul>
                      </nav>
                    </header>
                    <Switch>
                      <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
                      <Route path="/services/" exact component={Services} />
                      <Route path="/request/" exact component={Request} />
                      <Route path="/message/:roomID" exact render={({ match }) => <Message match={match} username={user.username} />} />
                      <Route path="/:userID" exact component={AllRequest} />
                      <Redirect path="*" to="/" />
                    </Switch>
                  </div>
                </div>
              </Router>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="wrap">
      <h1 className="top-title">WantToTravel4You</h1>
      <Particles
          params={{
            "particles": {
                "number": {
                    "value": 1000,
                    "density": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "speed": 4,
                        "size_min": 0.3
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "random": true,
                    "speed": 1,
                    "direction": "top",
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    }
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "duration": 2,
                        "size": 0,
                        "opacity": 0
                    },
                    "repulse": {
                        "distance": 400,
                        "duration": 4
                    }
                }
            }
          }
        }
      />
      <Router>
        <div className="content-top">
          <div className="content-flex">
            <header>
              <nav>
                <ul>
                  <li><Link to="/">HOME</Link></li>
                  <li><Link to="/services/">SERVICES</Link></li>
                </ul>
              </nav>
            </header>
            <Switch>
              <Route path="/" exact render={({ match }) => <Home match={match} type={type} area={agentArea} />} />
              <Route path="/services/" exact component={Services} />
              <Redirect path="*" to="/" />
            </Switch>
          </div>
          <div className="top-signin">
            <AmplifyAuthenticator>
              <AmplifySignUp
                slot="sign-up"
                formFields={[
                  { type: "username" },
                  { type: "password" },
                  { type: "email" }
                ]}
              />
            </AmplifyAuthenticator>
          </div>
        </div>
      </Router>
    </div>
  );
}
export default App;

