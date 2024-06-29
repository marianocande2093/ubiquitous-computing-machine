const randomNavigator = () => {
  const navigators = ["firefox", "edge", "chrome"];
  return navigators[Math.floor(Math.random() * navigators.length)];
};

Cypress.Commands.add("scrollAndWait", (id, duration) => {
  cy.get(`[id=${id}]`).scrollIntoView({
    easing: "linear",
    duration: duration,
    timeout: 250000,
  });
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
