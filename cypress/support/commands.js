const randomNavigator = () => {
  const navigators = ["firefox", "edge", "chrome"];
  return navigators[Math.floor(Math.random() * navigators.length)];
};

const randomScroll = (min = 150, max = 500) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomScrollCoordinates = (coordinates) => {
  coordinates.y += randomScroll();
  return coordinates;
};

Cypress.Commands.add("scrollAndWait", (coordinates, duration, wait) => {
  cy.scrollTo(coordinates.x, coordinates.y, {
    easing: "linear",
    duration: duration,
  });
  randomScrollCoordinates(coordinates);
  cy.wait(wait);
});

Cypress.Commands.overwrite("log", function (log, ...args) {
  if (Cypress.browser.isHeadless) {
    return cy.task("log", args, { log: false }).then(() => {
      return log(...args);
    });
  } else {
    console.log(...args);
    return log(...args);
  }
});
