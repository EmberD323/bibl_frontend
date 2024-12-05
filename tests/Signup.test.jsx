

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../src/components/Users/Signup.jsx";

describe("Signup component", () => {

  it("renders as per snapshot", () => {
    const { container } = render(<Signup />);
    expect(container).toMatchSnapshot();
  });
  //form errors
  it("renders form error if input is blank", async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    await waitFor(() => {
      const firstNameError = screen.getByText('Please fill out this field.', { selector: 'span' });
      expect(firstNameError).toBeInTheDocument();
    });
  });
  // it("on submit, name contains numbers. Error shown", async () => {
   
  // });
  // it("on submit, name too long. Error shown", async () => {
   
  // });
  // it("on submit, email already used. Error shown", async () => {
   
  // });
  // it("on submit, passwords atleast 8 characters. Error shown", async () => {
   
  // });
  // it("on submit, passwords doesnt include numbers. Error shown", async () => {
   
  // });
  // it("on submit, passwords dont match. Error shown", async () => {
   
  // });
  // it("navigates to login on successful submit", async () => {
   
  // });

  // it("renders as not clicked after button click with error", async () => {
  //   const user = userEvent.setup();
  //   render(<Signup />);
  //   const button = screen.getByRole("button");
  //   await user.click(button);
  //   expect(screen.getByTestId('custom-element').textContent).toMatch(/Clicked/i);
  // });


});
