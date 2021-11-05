describe("Food Restaurants", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/static/compile/homepage-style**").as(
      "homepageLoad"
    );
    cy.fixture("users.json").then((data) => {
      cy.simpleLogin(data.user, data.password);
    });
  });
  const city = "London";

  it("Search London for local deals (Any location, Any number of people)", function () {
    // Wait for homepage to load
    cy.wait("@homepageLoad");
    // Use the 'Food' navigation menu item
    cy.get(":nth-child(4) > .swipey__anchor").click();
    // Verify correct url redirection
    cy.url().should("contain", "restaurant-vouchers.html");
    // Search for London
    cy.get("#google-autocomplete").type(city);
    cy.get("#google-autocomplete").click();
    // necessary for the google powered search (not too sure how this integrates into the page)
    cy.wait(1000);
    cy.get("#google-autocomplete").trigger("keydown", { keyCode: 40 });
    cy.get("#google-autocomplete").trigger("keyup", { keyCode: 40 });
    cy.get("#google-autocomplete").trigger("keydown", { keyCode: 13 });
    // enter location selection
    cy.get(".px-12").click();
    // Assert each offer is based in London
    cy.get(".main-content").each(() => {
      cy.get(".mx-3").should("contain", city);
    });
    // Assert page has searched for London, UK
    cy.url().should("contain", "London,%20UK");
  });

  it("Assert 'Food' has correct number of offers (Deliberate Fail)", function () {
    // Wait for homepage to load
    cy.wait("@homepageLoad");
    // Use the 'Students' navigation menu item
    cy.get(":nth-child(4) > .swipey__anchor").click();
    var count = 0;
    cy.get(".main-content").each(() => {
      count += 1;
      cy.log("Offer Item : " + count);
      if (count === 11) {
        throw new Error(
          "There might be a 12th but we cannot tell as error is thrown at 11"
        );
      }
    });
  });
});
