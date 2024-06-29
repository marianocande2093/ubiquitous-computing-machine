/// <reference types="cypress" />

context("Navigation", () => {
  const acceptCookies = () => {
    cy.get("[id=accept-gdpr]").click();
  };

  const randomTimeScroll = (min = 150000, max = 180000) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomTimeScroll2 = (min = 20000, max = 40000) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomWindowSize = () => {
    const sizes = { width: 1920, height: 1080 };
    return sizes;
  };

  const knowIp = () => {
    cy.request("https://api.ipify.org/?format=json").then((response) => {
      cy.log(response.body.ip);
    });
  };

  const randomWindowSizeSelect = randomWindowSize();
  const url = Cypress.env("URL");

  it("through the page", () => {
    knowIp();
    cy.intercept("GET", "/collect*").as("GETcollect");
    cy.intercept("POST", "/g/collect*").as("POSTcollect");
    cy.viewport(randomWindowSizeSelect.width, randomWindowSizeSelect.height);
    cy.visit(url);
    acceptCookies();
    cy.scrollAndWait("authorsInfo", randomTimeScroll());
    cy.wait(6000);
    cy.scrollAndWait("footer-nav", randomTimeScroll2());
    cy.wait(6000);
  });
});
