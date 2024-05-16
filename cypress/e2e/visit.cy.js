/// <reference types="cypress" />

context("Navigation", () => {
  const acceptCookies = () => {
    cy.get("[id=accept-gdpr]").click();
  };

  const randomNumber = (min = 15, max = 40) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomTimeWait = (min = 5000, max = 13000) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomTimeScroll = (min = 200, max = 800) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomWindowSize = () => {
    const sizes = [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 1366, height: 768 },
      { width: 720, height: 900 },
      { width: 800, height: 600 },
      { width: 640, height: 480 },
      { width: 360, height: 640 },
    ];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const randomWindowSizeSelect = randomWindowSize();
  const url = Cypress.env("URL");

  it("through the page", () => {
    cy.viewport(randomWindowSizeSelect.width, randomWindowSizeSelect.height);
    cy.log("Window Size: ", randomWindowSizeSelect);
    const coordinates = { x: 0, y: 400 };
    const averageScroll = 30;
    cy.visit(url);
    acceptCookies();
    cy.wait(randomTimeWait());
    for (let i = 0; i < averageScroll; i++) {
      cy.scrollAndWait(coordinates, randomTimeScroll(), randomTimeWait());
    }
  });
});
