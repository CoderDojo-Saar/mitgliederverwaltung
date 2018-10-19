import React, { Component } from "react";
import ActiveLink from "./ActiveLink";
import { TabNavigation, Tab } from "evergreen-ui";

// Navigation Items
const nav = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/contacts",
    name: "Contacts"
  },
  {
    path: "/events",
    name: "Events"
  },
  {
    path: "/eventseries",
    name: "EventSeries"
  },
  {
    path: "/participants",
    name: "Participants"
  }
];
class Page extends Component {
  render() {
    return (
      <main>
        <TabNavigation>
          {nav.map((entry, index) => (
            <ActiveLink key={index} href={entry.path}>
              <Tab is="a" href="">
                {entry.name}
              </Tab>
            </ActiveLink>
          ))}
        </TabNavigation>
        <div>{this.props.children}</div>
      </main>
    );
  }
}

export default Page;
