import React, { Component } from "react";
import ActiveLink from "./ActiveLink";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import Container from "react-bootstrap/lib/Container";
class Page extends Component {
  render() {
    return (
      <main>
        <Navbar>
          <Navbar.Brand>Mitgliederverwaltung</Navbar.Brand>
          <Nav>
            <ActiveLink href="/" prefetch>
              <a className="nav-link">Dashboard</a>
            </ActiveLink>
            <ActiveLink href="/contacts" prefetch>
              <a className="nav-link">Contacts</a>
            </ActiveLink>
            <ActiveLink href="/events" prefetch>
              <a className="nav-link">Events</a>
            </ActiveLink>
            <ActiveLink href="/eventseries" prefetch>
              <a className="nav-link">Eventseries</a>
            </ActiveLink>
            <ActiveLink href="/participants" prefetch>
              <a className="nav-link">Participants</a>
            </ActiveLink>
          </Nav>
        </Navbar>
        <Container fluid={true}>{this.props.children}</Container>
      </main>
    );
  }
}

export default Page;
