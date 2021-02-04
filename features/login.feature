Feature: Can I login?
  Scenario: Doing login action
    Given I am on the localhost login page
    When I enter "1231233" in the "pwz"
    And I enter "Qweasdzxc!23" in the "password"
    And I submit "submit"
    Then Im logged in