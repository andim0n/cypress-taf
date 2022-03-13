Feature: Example

  Background: The user opens google page
    Given the user navigates to the "https://www.google.com/"

  Scenario Outline: Search functionality
    Given the URL contains "google.com"
    When the user searches for "<searchText>"
    Then the page with results is loaded
    Examples:
      | searchText |
      | foo        |
      | bar        |